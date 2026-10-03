function ensureMembership(req, res, next){
    if(req.user.membership_status == true){
        console.log("Membership Status: ", req.user.membership_status);
        return next();
    }

    res.redirect("/auth/membership");
}

module.exports = ensureMembership;