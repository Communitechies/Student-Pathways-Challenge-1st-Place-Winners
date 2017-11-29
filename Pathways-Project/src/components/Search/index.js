import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Header from 'grommet/components/Header'
import Title from 'grommet/components/Title'
import Box from 'grommet/components/Box'
import Search from 'grommet/components/Search'
import Table from 'grommet/components/Table';
import TableHeader from 'grommet/components/TableHeader';
import TableRow from 'grommet/components/TableRow';
import Article from 'grommet/components/Article';
import Paragraph from 'grommet/components/Paragraph'

import { loadPathways } from '../../store/jobPathway'

class SearchPathways extends PureComponent {

    constructor(props) {
        super();

        const { pathways } = props;
        this.columns = [
            {label: 'Job Title/Program Name', sort: 'name'},
            {label: 'Type', sort: 'type'},
            {label: 'Career Field', sort: 'field'},
            {label: 'Favourite', sort: 'favourite'}
        ];
        this.state = {
            pathways: [],
            searchText: ''
        };
    }

    componentDidMount() {
        this.props.actions.loadPathways()
    }

    generateTableRows = () => {
        let searchText = this.state.searchText.toLowerCase();
        let pathways = this.props.pathways.pathways;
        if (searchText) {
            pathways = pathways.filter((pathway) => {
                return pathway.pathway.toLowerCase().indexOf(searchText) !== -1;
                // pathways.includes(pathway.pathway.toLowerCase(), searchText)
            });
        }
        return pathways ? pathways.map((pathway) => {
            return (
                <TableRow>
                    <td>{pathway.pathway}</td>
                    <td>Job</td>
                </TableRow>
            )
        }) : null
    };

    handleSearchChange = (ev) => {
        this.setState({searchText: ev.target.value})
    };

    render () {
        return (
            <Article id='Search'>
                <Box flex='grow' direction='row'>
                    <Box style={{flex: 3}} direction='column'>
                        <Box direction='column'>
                            <Header pad='medium' justify='between'>
                                <Title> Search Pathways</Title>
                            </Header>
                            <Box flex='grow' direction='row'>
                                <Search
                                    fill
                                    inline
                                    placeHolder='Search'
                                    size='large'
                                    iconAlign='start'
                                    value={this.state.searchText}
                                    onDOMChange={this.handleSearchChange}/>
                            </Box>
                        </Box>
                        <Table>
                            <TableHeader labels={this.columns.map(v => v.label.toUpperCase())}/>
                            <tbody>
                                {this.generateTableRows()}
                            </tbody>
                        </Table>
                    </Box>
                    <Box style={{flex: 1, border: 'solid 1px black', direction: 'column'}}>
                        <Header pad='medium' justify='between'>
                            <Title> Details Here</Title>
                        </Header>
                        <Paragraph margin='medium' align='center' size='large'> Testing this shit </Paragraph>
                        <Paragraph margin='medium' align='center' size='large'> Testing this shit </Paragraph>
                    </Box>
                </Box>
            </Article>
        )
    }
}

const stateToProps = (state) => ({
    pathways: state.jobPathway.pathways
});

const dispatchToProps = (dispatch) => ({
    actions: bindActionCreators({ loadPathways }, dispatch)
});

export default connect(stateToProps, dispatchToProps)(SearchPathways)