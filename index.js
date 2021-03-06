const express = require('express')
const path = require('path')
const exphbs = require('express-handlebars')
const Handlebars = require('handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const mongoose = require('mongoose')

const homeRoutes = require('./routes/home')
const loginRouter = require('./routes/loginPage')
const productsRouter = require('./routes/products')
const addRouter = require('./routes/add')
const aboutRouter = require('./routes/about')
const cardRouter = require('./routes/cart')
const testRouter = require('./routes/test')

const User = require('./models/users')

const app = express()

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs',
    handlebars: allowInsecurePrototypeAccess(Handlebars) // решает проблемы с доступом
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public/')))

app.use(async (req, res, next) => {
    try {
        const user = await User.findById('5fdcde4c1e0c4103a7568e4f')
        req.user = user
        next()
    } catch (err){console.log(err)}
})

app.use(express.urlencoded({extended: true}))

app.use('/', homeRoutes)
app.use('/products', productsRouter)
app.use('/add', addRouter)
app.use('/cart', cardRouter)
app.use('/login', loginRouter)
app.use('/about' ,aboutRouter)
app.use('/test' ,testRouter)



const PORT = process.env.PORT || 3000

async function start (){
    try {
        const url = "mongodb+srv://admin:admin@cluster0.wn2yx.mongodb.net/shop"
        await mongoose.connect(url, { // without warnings
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })

        const candidate = User.findOne()
        if (!candidate){
            const  user = new User({
                name: 'Tor',
                email: 'tor@gmail.com',
                card:{items:[]}
            })
            await user.save()
        }


        app.listen(PORT, () => {
            console.log(`server on port:${3000} has been started...`)
        })
    }catch (err){
        console.log(err)
    }
}
start()


