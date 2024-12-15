import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Col, Container, Row, Table } from 'react-bootstrap'
import { useQuery } from 'react-query'
import Spinner from 'react-bootstrap/Spinner';
import BarChart from './BarChart'
import PieChart from './PieChart'

function PharmacyList() {

    //    <React Query>
    // function getPharmList() {
    //     return axios.get('https://jsonplaceholder.typicode.com/posts')
    // }
    // let { isLoading, isError, data } = useQuery('pharmList', getPharmList);
    // console.log(data?.data)
    //    <End React Query>

    //    usestate & useEffect Hooks
    const [list, setList] = useState([])
    const [isLoading, setLoading] = useState(false)
    const [error, setError] = useState(null);
    const [filterKeyword, setFilterKeyword] = useState('')
    const inventoryData = {
        "Medication A": 10,
        "Medication B": 15,
        "Medication C": 5,
    };

    async function getPharmList() {
        setLoading(true)
        try {
            let { data } = await axios.get('https://jsonplaceholder.typicode.com/posts');
            setList(data);
        } catch (err) {
            if (err.data) {
                setError(`Error: ${err.data.status} - ${err.data.data.message || 'An error occurred'}`);
            } else if (err.request) {
                setError('Error: No response from the server.');
            } else {
                setError(`Error: ${err.message}`);
            }
        } finally {
            setLoading(false);
        }
    }

    const onSearchForMedicine = (event) => {
        const searchWord = event.target.value
        setFilterKeyword(searchWord)
    }
    useEffect(() => {
        getPharmList()
    }, [])




    return (
        <Container>

            {!isLoading ?

                <>
                    <Row>
                        <Col xs={12}>

                            <input type="text" className="form-control my-3" placeholder="Search" aria-label="srearch" aria-describedby="basic-addon1" onKeyUp={onSearchForMedicine} />

                        </Col>

                    </Row>
                    <Row>
                        <Col xs={12}>
                            <div style={{ height: '400px', overflowY: 'auto' }}>
                                <Table className="table-success" responsive>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th> Name</th>
                                            <th>Description</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {list.filter((medicine) => {
                                            if (filterKeyword === '') {
                                                console.log("true")
                                                return true

                                            } else {
                                                console.log(medicine.title.includes(filterKeyword.toUpperCase()))

                                                return medicine.title.includes(filterKeyword)
                                            }

                                        }).map((medicine) => (
                                            <tr>
                                                <td> {medicine.id}</td>
                                                <td>{medicine.title}</td>
                                                <td>{medicine.body}</td>

                                            </tr>))}


                                    </tbody>
                                </Table>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={6}>
                            <BarChart medications={list} />
                        </Col>
                        <Col xs={6}>
                            <PieChart inventoryData={inventoryData} />
                        </Col>
                    </Row>
                </>

                :
                <><div style={{ minHeight: '70vh' }} className="d-flex justify-content-center align-items-center ">
                    <Spinner animation="border" variant='main' role="status" />
                </div></>
            }

        </Container >
    )
}

export default PharmacyList