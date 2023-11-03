const express = require('express')
const router = express.Router()
const ShortUrl = require('./shortUrl.js')
const service = require('./service')
const QRCode = require('qrcode')

router.get('/shortUrls' , async (req, res)=> {

    console.log("home");
    const shortUrls = await ShortUrl.find()
    res.json(shortUrls)
})

router.post('/shortUrls', async (req,res)=> {
    console.log(req.body);
    const { fullUrl } = req.body;
    console.log(fullUrl);
    if (!fullUrl) {
        return res.status(400).json({ error: 'URL is required' })
    }
    
    const existingUrl = await ShortUrl.findOne({ full: fullUrl })
    if (existingUrl) {
        res.send(existingUrl);
    } else {
        // const id = shortId.generate
        // const qrCodeUrl = ""
        // QRCode.toDataURL(id, (err, qrCodeUrl) => {
        //     if(err) {
        //         return res.status(500).json({ error: 'QR code generation error' })
        //     }  
        //     qrCodeUrl = qrCodeUrl
        // })
        const newUrl = await ShortUrl.create({full: fullUrl})
        res.send(newUrl).status(200)
    }
})

router.get('/shortUrls/:shortUrl', async (req,res)=> {
    console.log(req.params);
    const shortUrl = await ShortUrl.findOne({short: req.params.shortUrl })
    if(shortUrl === null) {
        return res.sendStatus(404)
    }
    shortUrl.clicks++
    shortUrl.save()
    res.send(shortUrl.full).status(302).send();
})

module.exports = router