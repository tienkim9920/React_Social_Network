const Users = require('../../Models/users.model')

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
    let pass_security = ''
    bcrypt.hash(password, 10, function(err, hash) {
        pass_security = hash
    });

    const data = {
        name: name,
        username: username,
        website: '',
        email: '',
        phone: phone,
        password: pass_security,
        image_profile: 'https://www.flaticon.com/svg/static/icons/svg/3135/3135715.svg'
    }

    Users.insertMany(data)

}