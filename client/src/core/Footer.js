import React from "react";
import {Link} from "react-router-dom";
import {ExternalLink} from "react-external-link"

const Footer = () => {
    
    return (
        <div className="footer">
            <div className="foot-item1">
                <div className="about foot-list-items">
                    <span><Link to=""><i className="fa fa-phone"></i>Contact us</Link></span>
                    <span><Link to=""><i className="fa fa-question"></i>About us</Link></span>
                    <span><Link to=""><i className="fa fa-cart-plus"></i>Wholesale</Link></span>
                </div>
                <div className="help foot-list-items">
                    <span><Link to=""><i className="fa fa-credit-card"></i>Payments</Link></span>
                    <span><Link to=""><i className="fa fa-truck"></i>Shipping</Link></span>
                    <span><Link to=""><i className="fa fa-minus-circle"></i>Cancellation & Returns</Link></span>
                    <span><Link to=""><i className="fa fa-question"></i>FAQ</Link></span>
                </div>
                <div className="policy foot-list-items">
                    <span><Link to="">Return Policy</Link></span>
                    <span><Link to="">Terms of Use</Link></span>
                    <span><Link to=""><i className="fa fa-shield"></i>Security</Link></span>
                    <span><Link to=""><i className="fa fa-user-secret"></i>Privacy</Link></span>
                </div>
                <div className="socail foot-list-items">
                    <span><Link to=""><i className="fa fa-facebook"></i>Facebook</Link></span>
                    <span><ExternalLink href="https://twitter.com/Nandaki80491722"><i className="fa fa-twitter"></i>Twitter</ExternalLink></span>
                    <span><ExternalLink href="https://www.linkedin.com/in/nanda-kishore-3362851b8/"><i className="fa fa-linkedin"></i>Linkedin</ExternalLink></span>
                    <span><Link to=""><i className="fa fa-telegram"></i>Telegram</Link></span>
                </div>
            </div>
            
            <div className="foot-item2">
                <div className="help-center py">
                    <i className="fa fa-question-circle"></i>Help Center
                </div>
                <div className="copyright py">
                    <i className="fa fa-copyright"></i>All rights Reserved
                </div>
                <div className="atm-cards py">
                    <span><i className="fa fa-cc-visa"></i></span>
                    <span><i className="fa fa-credit-card-alt"></i></span>
                    <span><i className="fa fa-cc-visa"></i></span>
                    <span><i className="fa fa-credit-card-alt"></i></span>
                    <span><i className="fa fa-cc-visa"></i></span>
                    <span><i className="fa fa-credit-card-alt"></i></span>
                    <span><i className="fa fa-cc-visa"></i></span>
                    <span><i className="fa fa-credit-card-alt"></i></span>
                    
                </div>
            </div>

        </div>
    )
}

export default Footer;