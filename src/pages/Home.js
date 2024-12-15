import React, { useState } from 'react'
import { Container, Row } from 'react-bootstrap'
import PharmacyList from '../components/PharmacyList'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import PieChart from '../components/PieChart';



function Home() {
    const [isOpen, setIsOpen] = useState(false);
    const [activeContent, setActiveContent] = useState('Dashboard');

    const toggleNav = () => {
        setIsOpen(!isOpen);
    };
    const handleItemClick = (content) => {
        setActiveContent(content);
        setIsOpen(false); // Optionally close the sidebar when an item is clicked
    };


    return (
        <>
            <Container fluid>
                <Row>

                    <div>
                        <div
                            style={{
                                width: isOpen ? '250px' : '60px',
                                transition: 'width 0.3s',
                                height: '100vh',
                                backgroundColor: '#111',
                                color: '#fff',
                                position: 'fixed',
                                overflow: 'hidden',
                            }}
                        >
                            <button
                                className="btn btn-dark"
                                style={{ margin: '10px', float: 'right' }}
                                onClick={toggleNav}
                            >
                                {isOpen ? 'x' : '>>'}
                            </button>
                            <ul className="nav flex-column" >
                                <li className="nav-item">
                                    <a className="nav-link" style={{ whiteSpace: 'nowrap' }}
                                        onClick={() => handleItemClick(<PharmacyList />)}>

                                        {isOpen && <span><FontAwesomeIcon icon={faHome} />  Dashboard </span>}
                                    </a>
                                </li>

                            </ul>
                        </div>

                        <div id='content-wrapper'
                            style={{
                                marginLeft: isOpen ? '250px' : '60px',
                                transition: 'margin-left 0.3s',
                                padding: '20px',
                            }}
                        >
                            {activeContent}
                        </div>
                    </div>



                </Row>
            </Container>


        </>
    )
}

export default Home