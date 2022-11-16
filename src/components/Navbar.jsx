import React, {useState, useEffect} from 'react'
import { Button, Menu, Typography, Avatar } from 'antd';
import { Link } from 'react-router-dom';
import { HomeOutlined, MoneyCollectOutlined, BulbOutlined, FundOutlined, MenuOutlined } from '@ant-design/icons';
import logo from '../images/ccLogo.png';

const Navbar = () => {
    // statefields for responsive menu
    const [activeMenu, setActiveMenu] = useState(true);
    const [screenSize, setScreenSize] = useState(null);

    // Function that runs once at the start of render, no dependency array - resizes navbar so it is responsive.
    useEffect (()=> {
        const handleResize = () => setScreenSize(window.innerWidth);

        window.addEventListener('resize', handleResize);

        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // This useEffect only runs when screenSize changes. If screensize is less than 768px, it is a mobile device.
    useEffect (() => {
        if(screenSize < 768) {
            setActiveMenu(false);
        } else {
            setActiveMenu(true);
        }
    },[screenSize])

  return (
     <div className="nav-container">
            <div className="logo-container">
                <Avatar src={logo} size="large" />
                <Typography.Title level={2} className="logo">
                    <Link to="/">Crypto Central</Link>
                </Typography.Title>
                <Button className="menu-control-container" onClick={() => setActiveMenu(!activeMenu)}>
                    <MenuOutlined />
                </Button>
            </div>
            {activeMenu && (
                <Menu theme='dark'>
                <Menu.Item key={"home"} icon={<HomeOutlined />}>
                    <Link to="/">Home</Link>
                </Menu.Item>
                <Menu.Item key={"cryptocurrencies"} icon={<FundOutlined />}>
                    <Link to="/cryptocurrencies">Cryptocurrencies</Link>
                </Menu.Item>
                <Menu.Item key={"exchanges"} icon={<MoneyCollectOutlined />}>
                    <Link to="/exchanges">Exchanges</Link>
                </Menu.Item>
                <Menu.Item key={"news"} icon={<BulbOutlined />}>
                    <Link to="/news"> News </Link>
                </Menu.Item>
            </Menu>
            )}
        </div>  
    )
}

export default Navbar;