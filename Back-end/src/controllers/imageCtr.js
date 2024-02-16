const path = require ('path')

exports.getImage = async (req, res) => {
    // console.log('-------------------', req)
    const { filename } = req.query;
    const imgPath = path.resolve(__dirname)
    const newImagePath = imgPath.replace('src/controllers', '');
    console.log('---------------------', newImagePath)
    const filePath = newImagePath +'uploads' + '/' + filename;
    res.download(filePath, (err) => {
    if (err) {
        console.error('Error downloading file:', err);
        return res.status(500).send('Error downloading file');
    }
    });
}
