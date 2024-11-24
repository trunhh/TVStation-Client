import { Component } from "react";

class Counter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0
        }
        this.increment = this.increment.bind(this)
        this.decrement = this.decrement.bind(this)
    }

    increment() {
        this.setState({
            count: this.state.count + 1
        }, function() {
            console.log('count value after setState: ' + this.state.count)
        })

        console.log('count: ' + this.state.count);
    }

    decrement() {
        // this.setState((preState) => {
        //     preState.count =  preState.count - 1;
        // })
        this.setState({
            count: this.state.count - 1
        })
    }

    render () {
        return (
            <>
                {this.props.render({
                    count2: this.state.count,
                    increment: this.increment, 
                    decrement: this.decrement
                })}

                {/* {this.props.render(
                    this.state.count,
                    this.increment, 
                    this.decrement
                )} */}
            </>
        )
    }
}

export default Counter;