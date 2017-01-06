var CONTACTS = [
    {
        id: 1,
        name: 'Darth Vader',
        phoneNumber: '+250966666666',
        image: 'http://cs7.pikabu.ru/images/big_size_comm_an/2014-03_7/13962622876915.gif',
        email: 'DarthVader@mail.com',
        address: 'Darth Vader city'
    }, {
        id: 2,
        name: 'Princess Leia',
        phoneNumber: '+250966344466',
        image: 'http://images6.fanpop.com/image/photos/33100000/CARRIE-FISHER-anakin-vader-and-princess-leia-33186069-190-149.gif',
        email: 'PrincessLeia@mail.com',
        address: 'PrincessLeia city'
    }, {
        id: 3,
        name: 'Luke Skywalker',
        phoneNumber: '+250976654433',
        image: 'http://www.youshouldshare.me/wp-content/uploads/2015/03/14264215682890-anigif_enhanced-buzz-13518-1367608452-4.gif',
        email: 'LukeSkywalker@mail.com',
        address: 'Luke Skywalker city'
    }, {
        id: 4,
        name: 'Chewbacca',
        phoneNumber: '+250456784935',
        image: 'https://media.giphy.com/media/RUUdVZqwpfTRS/giphy.gif',
        email: 'Chewbacca@mail.com',
        address: 'Chewbacca city'
    }
];

var ContactList = React.createClass({
    getInitialState: function () {
        return {
            displayedContacts: CONTACTS
        };
    },
    handleSearch: function (e) {
        var searchQuery = e.target.value.toLowerCase();
        var displayedContacts = CONTACTS.filter(function (el) {
            var searchValue = el.name.toLowerCase();
            return searchValue.indexOf(searchQuery) != -1;
        });
        this.setState({
            displayedContacts: displayedContacts
        })
    },
    render: function () {

        return (
            <div className="contacts">
                <input type="text" className="search-field" onChange={this.handleSearch}/>
                <ul className="contacts-list">
                    {
                        this.state.displayedContacts.map(function (el) {
                            return <Contact
                                key={el.id}
                                name={el.name}
                                phoneNumber={el.phoneNumber}
                                image={el.image}
                                email={el.email}
                                address={el.address}
                            />;
                        })
                    }
                </ul>
            </div>)
    }
});

var Contact = React.createClass({
    getInitialState: function () {
        return {
            isOpen: false
        };
    },
    handleClick: function (e) {
        e.preventDefault();

        if (!this.state.isOpen) {
            return (
                this.setState({
                    isOpen: true
                })
            )
        }

        this.setState({
            isOpen: false
        })

    },
    render: function () {
        if (this.state.isOpen) {
            return (
                <li className="contact" onClick={this.handleClick}>
                    <img className="contact-image" src={this.props.image} width="60px" height="60px"/>
                    <div className="contact-name">{this.props.name}</div>
                    <div className="contact-number">{this.props.phoneNumber}</div>
                    <div className="contact-info">
                        <div className="contact-email">{this.props.email}</div>
                        <div className="contact-address">{this.props.address}</div>
                    </div>
                </li>)
        }
        return (<li className="contact" onClick={this.handleClick}>
            <img className="contact-image" src={this.props.image} width="60px" height="60px"/>
            <div className="contact-name">{this.props.name}</div>
            <div className="contact-number">{this.props.phoneNumber}</div>
        </li>)
    }
});

ReactDOM.render(
    <ContactList/>,
    document.getElementById('content')
);