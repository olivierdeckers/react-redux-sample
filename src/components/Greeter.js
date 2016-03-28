import React from 'react'
import { connect } from 'react-redux'
import UpdateName from 'actions/UpdateName'

class Greeter extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello, {this.props.name}</h1>
        <input type="text" onChange={this.props.updateName} />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return { name: state.NameReducer.name }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateName: (event) => {
      dispatch(UpdateName(event.target.value))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Greeter)
