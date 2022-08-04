const router = require('express').Router()
const Profile = require('../models/Profile')
const fetch = (url) => import('node-fetch').then(({ default: fetch }) => fetch(url));


// CREATE
router.post('/', (req, res) => {

  let userProfile = req.body.user

  let url = `https://api.github.com/users/${userProfile}`

  fetch(url)
    .then(function (response) {
      return response.json()
    })
    .then(function (data) {
      if(!data.login) {
        return res.status(500).json({error : "não foi possível concluir a operação"})
      } 
      else {
        
        const userLogs = {
          username: data.login,
          avatar: data.avatar_url,
          profileUrl: data.html_url,
          bio: data.bio,
          qtdRepos: data.public_repos,
          followers: data.followers,
        }
  
        Profile.create(userLogs)
        res.send(userLogs)
      }
    })

})

// READ
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find()
    res.status(200).json(profiles)
  }
  catch(error) {
    return res.status(500).json({error : error})
  }
})

router.get("/:username", async (req, res) => {
  const userSearch = req.params.username

  try {
    const profile = await Profile.findOne({ username : userSearch })
    res.status(200).json(profile)
  }
  catch(error) {
    return res.status(500).json({error : "some error ocurred"})
  }
})


// UPDATE

router.put("/:username", (req, res) => {
  const userSearch = req.params.username
  const newUser = req.body.user

  let url = `https://api.github.com/users/${newUser}`
  
  fetch(url)
    .then(function (response) {
      return response.json()
    })
    .then(async function (data) {
      if(!data.login) {
        return res.status(500).json({error : "não foi possível concluir a operação"})
      } 
      else {
        
        const userLogs = {
          username: data.login,
          avatar: data.avatar_url,
          profileUrl: data.html_url,
          bio: data.bio,
          qtdRepos: data.public_repos,
          followers: data.followers,
        }
  
        const newProf = await Profile.updateOne({username: userSearch}, userLogs)
        if (newProf.matchedCount === 0) {
          res.status(422).json({error:"o usuario não foi encontrado!"})
          return
        }
        res.send(newProf)
      }
    })
  })
  
// DELETE

router.delete("/:username", async (req, res) => {
  const userSearch = req.params.username

  try {
    const profile = await Profile.deleteOne({ username : userSearch })
    res.status(200).json("dleetado com sucesso")
  } 
  catch(error) {
    return res.status(500).json({error : "some error ocurred"})
  }
})

module.exports = router