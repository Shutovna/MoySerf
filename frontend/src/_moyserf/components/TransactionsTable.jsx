import useTransactionService from "../services/TransactionService.jsx";
import {FC, Fragment, useEffect, useState} from 'react';
import {Card, Col, Row} from 'react-bootstrap';
import {Grid} from "gridjs-react";
import "gridjs/dist/theme/mermaid.css";
import {kopeykaToRuble} from "../util/Util.jsx";

const TransactionsTable = () => {

    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(10);
    const [totalPages] = useState(1);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const dateFormatter = function(date) {
        if (date) {
            const dateObj = new Date(date);
            return dateObj.toLocaleString('ru-RU', {
                /*weekday: "long",*/
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
            });
        }
        return '';
    };

    const sumFormatter = function(sum) {
        if (sum) {
            return kopeykaToRuble(sum);
        }
        return '';
    };


    const Columns = [{
        id: "description",
        name: "Описание",
        width: "250px",
    }, {
        id: "sum",
        name: "Сумма",
        width: "30px",
        formatter: sumFormatter
    }, {
        id: "type",
        name: "Тип",
        width: "150px",
    }, {
        id: "createdDate",
        name: "Дата",
        width: "100px",
        formatter: dateFormatter
    }];
    let {getMyTransactions} = useTransactionService();
    const [transactions, setTransactions] = useState([])
    useEffect(() => {
        getMyTransactions().then((transactions) => {
            setTransactions(transactions);
        })
            .catch(reason => console.log(reason))

    }, []);


    return (
        <Fragment>
            <Row>
                <Col xl={12}>
                    <Card className="custom-card">
                        <Card.Header>
                            <Card.Title>
                                Список операций
                            </Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <div id="grid-header-fixed">
                                <Grid
                                    data={transactions}
                                    sort={true}
                                    search={true}
                                    fixedHeader={true}
                                    height='350px'
                                    language={{
                                        search: {
                                        placeholder: 'Поиск...',
                                    },
                                        sort: {
                                        sortAsc: 'Сортировать по возрастанию',
                                        sortDesc: 'Сортировать по убыванию',
                                    },
                                        pagination: {
                                        previous: '',
                                        next: 'Следующая',
                                        navigate: (page, pages) => `Страница ${page} из ${pages}`,
                                        page: (page) => `Страница ${page}`,
                                        showing: 'Показано от',
                                        of: 'из',
                                        to: 'до',
                                        results: 'записей',
                                    },
                                        loading: 'Загрузка...',
                                        noRecordsFound: 'Нет записей',
                                        error: 'Ошибка загрузки данных',
                                    }}
                                    columns={Columns} pagination={{
                                    limit: 5,
                                }}/>
                            </div>
                        </Card.Body>
                    </Card>
                    {/*<Card className="custom-card">
                        <Card.Header>
                            <Card.Title>
                                Responsive Datatable
                            </Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <div className="table-responsive">
                                <ResponsiveDataTable columns={COLUMNS} data={transactions}/>
                            </div>
                        </Card.Body>
                    </Card>*/}
                </Col>
            </Row>

        </Fragment>
    );
};


export default TransactionsTable;
