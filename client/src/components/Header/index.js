import React from 'react';

function Header(props) {
    const logOut = () => {
        
    }
    return (
        <header className="header">
            <nav className="navbar navbar-expand-lg navbar-light">
                <div className="container-fluid header-fluid">
                    <a className="navbar-brand mr-auto" href="/">
                        Property App
                </a>
                    {!props.hideLogout ? <button type="button" className="btn btn-outline-secondary" onClick={() => logOut()}>Logout</button> : ""}
                </div>
            </nav>
        </header>
    )
}
export default Header;