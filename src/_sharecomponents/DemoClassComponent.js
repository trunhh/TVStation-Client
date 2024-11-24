import React, { Component } from 'react'
import './DemoClassComponent.css'
import OnMouseHover from './renderprops/OnMouseHover'

class DemoClassComponent extends Component {
    constructor(props) {
        console.log(props)
        super(props)
        this.state = {
            fontColor: 'red',
            fontSize: '16px',
            count: 0,
            flagShowh3: false
        }
        this.handleClick = this.handleClick.bind(this)
    }
    
    handleClick () {
        // console.log('clicked...')
        // console.log(this)
        // this.setState({
        //     fontColor: 'green',
        // })
        // this.setState({
        //     count: this.state.count ++
        // })

        // this.setState({
        //     flagShowh3: !this.state.flagShowh3
        // })

        this.setState((a) => {
            console.log(a);
            a.count = a.count + 1;
            return a;
        })
    }

    //Mounting:

    //WillMount
    componentWillMount() {
        console.log('Component will mount... 1')
    }
    //Render

    //DidMount
    componentDidMount() {
        //console.log('Component did mount... 3')
    }

    //Updating:
    componentWillReceiveProps() {
        // console.log('Component will receive props...')
        // console.log(this.props.user)
    }

    shouldComponentUpdate() {
        //console.log('Component should update...')//return true or false
        // if (this.props.user.password === '111111') return true
        // return false
        return true
    }

    componentWillUpdate() {
        //console.log('Component will update ')
    }

    componentDidUpdate() {
        //console.log('Component did update after received props...')
    }
    //UnMount
    componentWillUnmount() {
        //console.log('Demo Component will unmount...')
    }



    render() {
        console.log('DemoClassComponent rendered... ')

        const {user} = this.props
        //console.log(user)

        return (
            <div className='demo demo2'>
                <h1 style={{color: this.state.fontColor}}>Demo class component</h1>
                <h3 className={this.state.flagShowh3 ? 'h3': 'hide'}>Welcome: {this.props.username}</h3>
                <h2>{this.state.count}</h2>
                <button onClick={this.handleClick}>Click me</button>
                <h1>User info:</h1>
                <h3>username: {this.props.user.username}</h3>
                <h3>password: {this.props.user.password}</h3>
                <br></br>
                <hr></hr>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
            </div>
        )
    }
}

//export default DemoClassComponent

export default React.memo(DemoClassComponent);