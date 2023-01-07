import React from 'react'

import GithubIcon from '../assets/img/github.svg'
import './Footer.css'

function Footer() {
    return (
        <div className="footer-warraper">
            <div className="container">
                <p className="copyright-text">Copyright &copy; 2021 Anhnh</p>
                <div className="group-icon">
                    <a href="https://github.com/hoanganh20012001/sorting-visualizer">
                        <img className="github-icon" src={GithubIcon} alt="" />
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Footer
