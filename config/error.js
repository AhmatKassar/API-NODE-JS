module.exports = (err, req, res, next) => {
    const status = err.status_Code || 200;
    const message = err.message;
    const data = err.data;
    const custom_status = err.custom_status || status;
    res.status(status).json({status_Code: custom_status, status_message: message, data: data});
};