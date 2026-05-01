const DashboardLogic = (req , res) => {
try {
    const user = req.user

    return res.status(200).json({
       message : "Dashboard Loaded Successfully",
       user : user
    })
} catch (error) {
    return res.status(500).json({
        message : "Internal Server Error"
    })
}
}

export default DashboardLogic