import React from 'react';
import { Link } from 'react-router';

const Header = ({ cates, currentCate, getPosts, user }) => (
    <div className="navbar navbar-default">
        <div className="container">
            <div className="navbar-header">
                <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#main-navbar" aria-expanded="false">
                    <span className="sr-only">Toggle</span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                </button>
                <Link to="/" className="navbar-brand" onClick={() => getPosts()}>前端日志网</Link>
            </div>
            <div className="collapse navbar-collapse" id="main-navbar">
                <ul className="nav navbar-nav">
                    <li className={currentCate === 'index' ? 'active': ''}>
                        <Link onClick={() => getPosts()} to="/">首页</Link>
                    </li>
                    <li className={currentCate === 'frontend' ? 'active' : ''}>
                        <Link onClick={() => getPosts('frontend')} to={'/frontend'}>前端</Link>
                    </li>
                    <li className={currentCate === 'nodejs' ? 'active' : ''}>
                        <Link onClick={() => getPosts('nodejs')} to={'/nodejs'}>Node.js</Link>
                    </li>
                    <li className={currentCate === 'about' ? 'active' : ''}>
                        <Link to={'/about'}>关于</Link>
                    </li>
                    {/*
                    {cates && cates.length && cates.map((cate, i) =>
                        <li className={currentCate === cate.url ? 'active' : ''} key={i}>
                            <Link onClick={() => getPosts(cate.url)} to={`/${cate.url}`}>{cate.name}</Link>
                        </li>
                    )}
                    */}
                </ul>
                {user &&
                <ul className="nav navbar-nav navbar-right">
                    <li>
                        <Link to={'/post/new'}>写文章</Link>
                    </li>
                    <li>
                        <a>Hi，{user.username}</a>
                    </li>
                    <li>
                        <Link to={'/logout'}>退出</Link>
                    </li>
                </ul>
                ||
                <ul className="nav navbar-nav navbar-right">
                    <li>
                        <Link to={'/login'}>登录</Link>
                    </li>
                    {/*
                    <li>
                        <Link to={'/register'}>注册</Link>
                    </li>
                    */}
                </ul>
                }
            </div>
        </div>
    </div>
);

export default Header;

