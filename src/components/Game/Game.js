import React, { useState, useEffect } from 'react'
import axios from 'axios'

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
        console.log(res)
        setInventory(res.data.inventorys[0].potions)
        setIngredients(res.data.inventorys[0].ingredients)
        setInventoryId(res.data.inventorys[0]._id)
      })
      .catch(console.error)
  }, [])

  const brewPotion = () => {
    const brewNames = currentBrew.map(brew => brew.name)
    const brewAlphabetized = brewNames.sort()
    console.log(brewAlphabetized)
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
        const inventoryResult = inventory.filter(inventory => inventory.name === res.data.recipe[0].name)
        if (inventoryResult.length === 0) {
          setInventory(inventory.concat(res.data.recipe[0]))
        }
      })
      .then(setBrew([]))
      .catch(console.error)
  }

  const inventoryList = inventory.map(inventoryItem => (
    <li key={inventoryItem.id}>
      <button data-id={inventoryItem.effect} onClick={ () => {
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
        <button onClick={ () => {
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
    <div>
      <h4>Inventory</h4>
      <ul>
        {inventoryList}
      </ul>
      <br/>
      <h4>Ingredients</h4>
      <ul>
        {ingredientList}
      </ul>
      <br/>
      <h4>Brew</h4>
      <ul>
        {brewList}
        {currentBrew.length === 3 ? <button onClick={brewPotion}>Brew Potion</button> : '' }
      </ul>
    </div>
  )
}

export default Game
