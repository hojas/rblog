import React from 'react';
import { Link } from 'react-router';

const Header = ({ cates, currentCate }) => (
    <div className="Nnavbar navbar-default">
        <div className="container">
            <div className="navbar-header">
                <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#main-navbar" aria-expanded="false">
                    <span className="sr-only">Toggle</span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                </button>
                <Link to="/" className="navbar-brand">前端日志网</Link>
            </div>
            <div className="collapse navbar-collapse">
                <ul className="nav navbar-nav">
                    <li className={currentCate === 'index' ? 'active': ''}>
                        <Link to="/">首页</Link>
                    </li>
                    {cates && cates.length && cates.map((cate, i) =>
                        <li className={currentCate === cate.url ? 'active' : ''} key={i}>
                            <Link to={`/${cate.url}`}>{cate.name}</Link>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    </div>
);

export default Header;

