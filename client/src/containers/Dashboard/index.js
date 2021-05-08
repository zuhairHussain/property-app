import React, { Component } from 'react';
import Container from '../../components/Container';
import Table from '../../components/DataTable';
import { history } from '../../history';
import './dashboard.scss';

const ActionComponent = ({  row, onClick  }) => {
    const clickHandler = () => onClick(row);   
    return <button onClick={clickHandler}>Action</button>;
};
const ActionComponentForDelete = ({  row, onClick  }) => {
    const clickHandler = () => onClick(row.id);   
    return <button onClick={clickHandler}>Delete</button>;
};


class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            columns : [
                {
                    cell: row => <ActionComponent row={row} onClick={this.handleClick}/>,
                    ignoreRowClick: true,
                    allowOverflow: true,
                    button: true,
                },
                {
                    cell: row => <ActionComponentForDelete row={row} onClick={this.handleClickForDelete}/>,
                    ignoreRowClick: true,
                    allowOverflow: true,
                    button: true,
                },
                {
                    name: 'Title',
                    selector: 'title',
                    sortable: true,
                },
                {
                    name: 'Year',
                    selector: 'year',
                    sortable: true,
                    right: true,
                },
              ],
            users : [
                { id: 1, title: 'Conan the Barbarian', year: '1982' },
                { id: 2, title: 'Barbarian', year: '1990' }
            ]
        }
    }

    handleClick = value => {
      console.log(value)
      history.push('/edituser');
    };

    handleClickForDelete = value => {
        console.log(value)
      };

    render() {
        const {users, columns} = this.state;
        return (
            <Container className="home-page">
                <h1>Dashboard</h1>
                <Table data={users} columns={columns} title={'Users'} pagination={true}/>
            </Container>
        );
    }
}
export default Dashboard;