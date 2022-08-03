const mongoose = require('mongoose');

const Profile = mongoose.model('Profile', {
    username: String,
    avatar: String,
    profileUrl: String,
    bio: String,
    repos: String,
    qtdRepos: Number,
    followers: Number,
})

module.exports = Profile