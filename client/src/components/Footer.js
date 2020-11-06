import React, { Component } from 'react'
import '../css/footer.css'
import {FaFacebookF, FaGithub, FaLinkedinIn, FaTwitter} from 'react-icons/fa'

export default class Footer extends Component {

    render() {
        return (
            <React.Fragment>
            
            
          
            <footer className="site-footer">
              <div className="container">
                <div className="row">
                  <div className="col-sm-12 col-md-6">
                    <h6>About</h6>
                    <p className="text-justify">Designed and Developed by Sajal Gupta</p>
                  </div>
        
               
        
                </div>
                <hr></hr>
              </div>
              <div className="container">
                <div className="row" style={{justifyContent:"center"}}>
                  <div className="col-md-8 col-sm-6 col-xs-12">
                  
                    <p className="copyright-text">Copyright &copy; {new Date().getFullYear()
                    } All Rights Reserved.
                 
                    </p>
                  </div>
        
                  <div className="col-md-4 col-sm-6 col-xs-12">
                    <ul className="social-icons">
                      <li><a className="facebook" href="https://www.facebook.com/sajal.gupta.965"><FaFacebookF/></a></li>
                      
                      <li><a className="github" href="https://github.com/sajalgupta06"><FaGithub></FaGithub></a></li>
                      <li><a className="linkedin" href="https://in.linkedin.com/in/sajal-gupta-428b06193"><FaLinkedinIn></FaLinkedinIn></a></li>   
                    </ul>
                  </div>
                </div>
              </div>
        </footer>


            </React.Fragment>
        )
    }
}