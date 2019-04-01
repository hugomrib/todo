import './List.css'
import axios from 'axios'
import React, { Component } from 'react'

const baseURL = "http://localhost:3001/list"
const initialState = {
    list: { item: "" },
    items: []
}

export default class List extends Component {

    state = { ...initialState }

    clear() {
        this.setState({ list: initialState.list })
    }

    save() {
        const list = this.state.list
        const url = list.id ? `${baseURL}/${list.id}` : baseURL
        axios["put"](url, list)
            .then(resp => {
                const items = this.getUpdatedItems(resp.data)
                this.setState({list: initialState.list, items })
            })
    }

    getUpdatedItems(list) {
        const items = this.state.items.filter(u => u.id !== URLSearchParams.id)
        items.unshift(list)
        return items
    }

    updateField(event) {
        const list = { ...this.state.list }
        list[event.target.item] = event.target.value
        this.setState({ list })
    }

    render () {
        return (
        <div className="list">
            <input type="text"
                name="item"
                value={this.state.list.item}
                onChange={e => this.updateField(e)}
                placeholder="Insert what you need to do."
            />
            <button onClick={e => this.save(e)}>Save</button>
            <button onClick={e => this.clear(e)}>Cancel</button>
        </div>
        )
    }
}