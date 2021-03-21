
const Favorite = require('../../Models/favorite.model')
const Users = require('../../Models/users.model')
const Users_Activity = require('../../Models/users_activity.model')

module.exports.index = async (req, res) => {

    // Get id_user
    const id_user = req.params.id
    
    const favorite = await Favorite.find({ id_user: id_user })

    res.json(favorite)

}


module.exports.like = async (req, res) => {

    // Giai Thich: Khi mình bấm thích bài viết người đó thì ở bên phía của người đó sẽ hiện thông báo
    // vậy thì khi mình truy xuất bên màn hình người đó thì dữ liệu phải đổi ngược lại 
    // id_user sẽ thành id_user_another
    // id_user_another sẽ thành id_user

    // Get id_user
    const id_user = req.query.id_user

    // Get id_user_another
    const id_user_another = req.query.id_user_another

    // Get id_image_post
    const id_image_post = req.query.id_image_post

    // Get category là like hay comment ( 0 - 1)
    const category = req.query.category

    const user_activity = await Users_Activity.findOne({ id_user: id_user_another })

    const find_user = user_activity.list_image.find(value => {
        return value.id_image_post === id_image_post
    })

    const user_like = await Users.findOne({ _id: id_user })

    const data = {
        id_user: id_user_another,
        id_user_another: id_user,
        username_another: user_like.username,
        image_profile: user_like.image_profile,
        id_image_post: id_image_post,
        image_body: find_user.image_body,
        status: false,
        category: category
    }

    await Favorite.create(data)

    res.send("Thanh Cong")

}


module.exports.unlike = async (req, res) => {

    // Get id_user, id_user_another
    const id_user = req.query.id_user

    const id_user_another = req.query.id_user_another

    const favorite = await Favorite.findOne({ id_user: id_user, id_user_another: id_user_another })

    favorite.delete()

    res.send('Thanh Cong')    

}


module.exports.update = async (req, res) => {

    // Get id_user
    const id_user = req.query.id_user

    const favorite = await Favorite.find({ id_user: id_user })

    // Chuyển trạng thái thành true hết
    for (let i = 0; i < favorite.length; i++){
        if (favorite[i].status === false){
            favorite[i].status = true

            favorite[i].save()
        }
    }    

}
