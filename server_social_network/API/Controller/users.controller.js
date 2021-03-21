const Users = require('../../Models/users.model')
const Users_Activity = require('../../Models/users_activity.model')

const bcrypt = require('bcrypt');

// Hàm này load tất cả
module.exports.index = async (req, res) => {

    const users = await Users.find()

    res.json(users)

}

// Hàm này là detail id
module.exports.detail = async (req, res) => {
    
    const id = req.params.id

    const user = await Users.findOne({ _id: id })

    res.json(user)

}

// Hàm này đăng nhập
module.exports.signin = async (req, res) => {

    // Get emaill and password from API
    const phone = req.query.phone
    const password = req.query.password

    // Find user Login
    const user = await Users.findOne({ phone: phone})

    // Check Security
    // Tham số thứ nhât là pass mà user đăng nhập chưa mã hóa
    // Tham số thứ hai là pass mà ở trong DB đã được mã hóa
    bcrypt.compare(password, user.password, function(err, result) {
        if (result === true){
            res.send(user._id) // Gửi lên client id user
        }else{
            res.send("That bai")
        }
    });
    
}

// Hàm này đăng ký
module.exports.signup = async (req, res) => {

    // Get phone, full name, username, password from API
    const phone = req.query.phone
    const name = req.query.name
    const username = req.query.username
    const password = req.query.password

    // Check Security
    bcrypt.hash(password, 10, async function(err, hash) {
        const data = {
            name: name,
            username: username,
            website: '',
            email: '',
            phone: phone,
            password: hash,
            image_profile: 'https://www.flaticon.com/svg/static/icons/svg/3135/3135715.svg',
        }
    
        await Users.create(data)

            
        // Tiếp theo sẽ tạo mới database cho user_activity
        const user = await Users.findOne({ phone: phone })

        const data_activity = {
            id_user: user._id,
            post: "0",
            followers: "0",
            following: "0",
            list_image: []
        }


        await Users_Activity.create(data_activity)

    });

}


module.exports.search = async (req, res) => {

    const keyword = req.query.keyword

    const users = await Users.find()

    const filter_user = users.filter(value => {
        return value.username.toUpperCase().indexOf(keyword.toUpperCase()) !== -1 || 
        value.name.toUpperCase().indexOf(keyword.toUpperCase()) !== -1
    })

    res.json(filter_user)

}

module.exports.update = async (req, res) => {

    // Lấy các query sau đó update lại dữ liệu

    const id_user = req.query.id_user

    const name = req.query.name
    
    const username = req.query.username

    const website = req.query.website

    const email = req.query.email

    const phone = req.query.phone

    const user = await Users.findOne({ _id: id_user})

    user.name = name
    user.username = username
    user.website = website
    user.email = email
    user.phone = phone

    user.save()

    res.send("Thanh Cong!")

}


module.exports.password = async (req, res) => {

    const id_user = req.query.id_user

    const password = req.query.password

    const user = await Users.findOne({ _id: id_user})

    // Check Security
    bcrypt.hash(password, 10, async function(err, hash) {

        user.password = hash

        user.save()

        res.send("Thanh Cong")

    });

}

module.exports.avatar = async (req, res) => {

    const id_user = req.query.id_user

    const image_profile = req.query.image_profile

    const user = await Users.findOne({ _id: id_user })

    user.image_profile = image_profile

    user.save()

    res.send("Thanh Cong")

}