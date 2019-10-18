import React, { useState, useEffect } from 'react'
import axios from 'axios'

import CauldronSvg from './Cauldron'

import apiUrl from '../../apiConfig'

const Game = ({ user, match, alert }) => {
  const [inventory, setInventory] = useState([])
  const [ingredients, setIngredients] = useState([])
  const [currentBrew, setBrew] = useState([])
  const [inventoryId, setInventoryId] = useState('')

  useEffect(() => {
    axios({
      url: `${apiUrl}/inventorys`,
      method: 'POST',
      headers: {
        'Authorization': `Token token=${user.token}`
      } })
      .then(res => {
        setInventory(res.data.inventorys[0].potions)
        setIngredients(res.data.inventorys[0].ingredients)
        setInventoryId(res.data.inventorys[0]._id)
      })
      .catch(console.error)
  }, [])

  const brewPotion = () => {
    const brewNames = currentBrew.map(brew => brew.name)
    const brewAlphabetized = brewNames.sort()
    axios({
      url: `${apiUrl}/recipes/checkMatch`,
      method: 'POST',
      headers: {
        'Authorization': `Token token=${user.token}`
      },
      data: {
        _id: inventoryId,
        ingredient: {
          ingredient1: brewAlphabetized[0],
          ingredient2: brewAlphabetized[1],
          ingredient3: brewAlphabetized[2]
        }
      }
    })
      .then((res) => {
        let inventoryResult = []
        if (res.data.recipe.length !== 0) {
          inventoryResult = inventory.filter(inventoryItem => inventoryItem.name === res.data.recipe[0].name)
        }
        if (inventoryResult.length === 0) {
          if (res.data.recipe[0]) {
            setInventory(inventory.concat(res.data.recipe[0]))
          } else {
            alert({
              heading: 'Your brew failed!',
              message: 'It came out dark and sludge-y. Too bad- try again!',
              variant: 'danger'
            })
          }
        }
      })
      .then(setBrew([]))
      .catch(console.error)
  }

  const inventoryList = inventory.map(inventoryItem => (
    <li key={inventoryItem.id}>
      <button type="button" className="btn btn-secondary" data-toggle="tooltip" data-placement="top" title={inventoryItem.description} data-id={inventoryItem.effect} onClick={ () => {
        const newIngredients = ingredients.map(ingredient => {
          if (ingredient.name === inventoryItem.effect) {
            ingredient.available = true
          }
          return ingredient
        })
        setIngredients(newIngredients)
        const inventoryMap = inventory.map(inventory => inventory._id)
        axios({
          url: `${apiUrl}/inventorys/${inventoryId}`,
          method: 'PATCH',
          headers: {
            'Authorization': `Token token=${user.token}`
          },
          data: {
            inventory: {
              potions: inventoryMap,
              ingredients: ingredients
            }
          }
        })
          .then(res => {
            setInventory(res.data.inventorys[0].potions)
            setIngredients(res.data.inventorys[0].ingredients)
            setInventoryId(res.data.inventorys[0]._id)
          })
          .catch(console.error)
      }}>{inventoryItem.name}</button>
    </li>
  ))

  const ingredientList = ingredients.map(ingredient => {
    if (ingredient.available) {
      return <li key={ingredient.id}>
        <button type="button" className="btn btn-secondary" data-toggle="tooltip" data-placement="top" title={ingredient.description} onClick={ () => {
          if (currentBrew.length < 3) {
            setBrew(currentBrew.concat(ingredient))
          }
        }}>{ingredient.name}</button>
      </li>
    }
  })

  const brewList = currentBrew.map(ingredients => (
    <li key={ingredients.id}>
      {ingredients.name}
    </li>
  ))

  return (
    <div className="row gameRow">
      <div className="col-md-4 hoverGlowHot">
        <h4>Inventory</h4>
        <ul>
          {inventoryList}
        </ul>
      </div>
      <div className="col-md-4 centerColumn hoverGlowWarm">
        <h4>Brew</h4>
        <CauldronSvg/>
        <ul className="brewList">
          {brewList}
        </ul>
        {currentBrew.length === 3 ? <button type="button" className="btn btn-success" onClick={brewPotion}>Brew Potion</button> : '' }
      </div>
      <div className="col-md-4 hoverGlowCold">
        <h4>Ingredients</h4>
        <ul>
          {ingredientList}
        </ul>
      </div>
    </div>
  )
}

export default Game
