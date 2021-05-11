/*
	Todo:
		Reset maps should reset the maps with the filters enabled
		Only show maps with the filters enabled by default
*/

import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

import { ReactComponent as CTFlogo } from './gm-icons/ctf.svg';
import { ReactComponent as Elimlogo } from './gm-icons/elim.svg';
import { ReactComponent as DMlogo } from './gm-icons/dm.svg';
import { ReactComponent as TDMlogo } from './gm-icons/tdm.svg';
import { ReactComponent as Hybridlogo } from './gm-icons/hyb.svg';
import { ReactComponent as Controllogo } from './gm-icons/ctrl.svg';
import { ReactComponent as Escortlogo } from './gm-icons/esct.svg';
import { ReactComponent as Assaultlogo } from './gm-icons/asst.svg';

function shuffle(array) {
	var currentIndex = array.length, temporaryValue, randomIndex;
  
	// While there remain elements to shuffle...
	while (0 !== currentIndex) {
  
	  // Pick a remaining element...
	  randomIndex = Math.floor(Math.random() * currentIndex);
	  currentIndex -= 1;
  
	  // And swap it with the current element.
	  temporaryValue = array[currentIndex];
	  array[currentIndex] = array[randomIndex];
	  array[randomIndex] = temporaryValue;
	}
  
	return array;
  }

class Gamemode extends React.Component
{
	constructor(props)
	{
		super(props);
	}

	render()
	{
		const els = this.props.gamemodes.map((gamemode) =>
		{
			switch (gamemode)
			{
				case "Capture the Flag":
					return <CTFlogo key={gamemode} />;
				break;
				case "Elimination":
					return <Elimlogo key={gamemode} />;
				break;
				case "Deathmatch":
					return <DMlogo key={gamemode} />;
				break;
				case "Team Deathmatch":
					return <TDMlogo key={gamemode} />;
				break;
				case "Hybrid":
					return <Hybridlogo key={gamemode} />;
				break;
				case "Control":
					return <Controllogo key={gamemode} />;
				break;
				case "Escort":
					return <Escortlogo key={gamemode} />;
				break;
				case "Assault":
					return <Assaultlogo key={gamemode} />;
				break;
			}
		});
		return (
			<div className="Gamemode">
				{els}
			</div>
		);
	}
}

class FlagDisplay extends React.Component
{
	constructor(props)
	{
		super(props);
	}

	render()
	{
		return (
			<div className="FlagDisplay">
				<img className="flag" src={"./imgs/flags/" + this.props.flag} />
			</div>
		);
	}
}

class DisplayMap extends React.Component
{
	constructor(props)
	{
		super(props);
		this.handleClick = this.handleClick.bind(this);
		this.setVisible = this.setVisible.bind(this);
		this.setInvisible = this.setInvisible.bind(this);
		this.state = {
			full: false,
			visible: true
		};
	}

	setVisible()
	{
		this.setState({
			visible: true
		});
	}

	setInvisible()
	{
		this.setState({
			visible: false
		});
	}

	handleClick(e)
	{
		this.setState({
			full: !this.state.full
		});
	}

	small()
	{
		return (
			<div className={"DisplayMap" + (this.state.visible ? "" : " hidden")} onClick={this.handleClick}>
				<div className="map-container">
					<img className="map" src={"./imgs/maps/thumbnails/" + this.props.map.filename} />
				</div>
				<div className="subtitle">
					<FlagDisplay flag={this.props.map.flag} />{this.props.map.name}
					<Gamemode gamemodes={this.props.map.type} />
				</div>
			</div>
		);
	}

	full()
	{
		return (
			<div className="DisplayMapCurtain" onClick={this.handleClick}>
				<div className="DisplayMap full">
					<div className="btnClose">X</div>
					<div className="map-container">
						<img className="map" src={"./imgs/maps/" + this.props.map.filename} />
					</div>
					<div className="subtitle">
						<FlagDisplay flag={this.props.map.flag} />{this.props.map.name}
						<Gamemode gamemodes={this.props.map.type} />
					</div>
				</div>
			</div>
		);
	}

	render()
	{
		var res = [];
		res.push(this.small());
		if (this.state.full)
			res.push(this.full());
		return (res);
	}
}

class OrangeButton extends React.Component
{
	constructor(props)
	{
		super(props);
		this.onButtonClicked = this.onButtonClicked.bind(this);
	}

	onButtonClicked(e)
	{
		this.props.onClick(e);
	}

	render()
	{
		return (
			<div className="OrangeButton">
				<button onClick={this.onButtonClicked}>{this.props.name}</button>
			</div>
		);
	}
}

class InputFilter extends React.Component
{
	constructor(props)
	{
		super(props);
	}

	render()
	{
		return (
			<div className="InputFilter">
				<label><input onChange={this.props.onCheckChanged} checked={this.props.checked} type="checkbox" value={this.props.type} /> {this.props.type + " Maps"}</label>
			</div>
		);
	}
}

class Filters extends React.Component
{
	constructor(props)
	{
		super(props);
		this.onCheckChanged = this.onCheckChanged.bind(this);
		this.onButtonCheckAllClicked = this.onButtonCheckAllClicked.bind(this);
		this.onButtonUncheckAllClicked = this.onButtonUncheckAllClicked.bind(this);
		this.onButtonCompetitiveOnlyClicked = this.onButtonCompetitiveOnlyClicked.bind(this);
		this.state = {
			filters: [
				{
					"name": "Control",
					"checked": true
				},
				{
					"name": "Hybrid",
					"checked": true
				},
				{
					"name": "Assault",
					"checked": true
				},
				{
					"name": "Escort",
					"checked": true
				},
				{
					"name": "Team Deathmatch",
					"checked": false
				},
				{
					"name": "Deathmatch",
					"checked": false
				},
				{
					"name": "Capture the Flag",
					"checked": false
				},
				{
					"name": "Elimination",
					"checked": false
				}
			]
		};
	}

	onCheckChanged(e)
	{
		var oldmaps = this.props.Maps;
		var filters = this.state.filters;

		if (e != null)
		{
			for (var x in filters)
			{
				if (filters[x].name == e.target.value)
				{
					filters[x].checked = e.target.checked;
				}
			}
		}

		for (var x in oldmaps)
		{
			oldmaps[x].ref.current.setInvisible();
			for (var y in filters)
			{
				if (filters[y].checked)
				{
					if (oldmaps[x].props.map.type.includes(filters[y].name))
					{
						oldmaps[x].ref.current.setVisible();
					}
				}
			}
		}
		//this.props.SetMaps(oldmaps);
		this.setState({
			filters: filters
		});
	}

	onButtonCheckAllClicked(e)
	{
		var filters = this.state.filters;
		for (var x in filters)
		{
			filters[x].checked = true;
		}
		this.setState({
			filters: filters
		});
		this.onCheckChanged();
	}

	onButtonUncheckAllClicked(e)
	{
		var filters = this.state.filters;
		for (var x in filters)
		{
			filters[x].checked = false;
		}
		this.setState({
			filters: filters
		});
		this.onCheckChanged();
	}

	onButtonCompetitiveOnlyClicked(e)
	{
		var filters = this.state.filters;
		var compOnly = [
			"Control",
			"Hybrid",
			"Assault",
			"Escort"
		];
		for (var x in filters)
		{
			filters[x].checked = compOnly.includes(filters[x].name);
		}
		this.setState({
			filters: filters
		});
		this.onCheckChanged();
	}

	render()
	{
		const inputs = this.state.filters.map((filter) =>
		{
			return <InputFilter key={filter.name} checked={filter.checked} onCheckChanged={this.onCheckChanged} type={filter.name} />;
		});
		return (
			<div className={"Filters" + (this.props.visible ? "" : " hidden")}>
				<h3>Select which map types you want to see</h3>
				<OrangeButton name="Check All" onClick={this.onButtonCheckAllClicked} />
				<OrangeButton name="Uncheck All" onClick={this.onButtonUncheckAllClicked} />
				<BlueButton name="Competitive Only" onClick={this.onButtonCompetitiveOnlyClicked} />
				{inputs}
			</div>
		);
	}
}

class BlueButton extends React.Component
{
	constructor(props)
	{
		super(props);
		this.onButtonClicked = this.onButtonClicked.bind(this);
	}

	onButtonClicked(e)
	{
		this.props.onClick(e);
	}

	render()
	{
		return (
			<div className="BlueButton">
				<button onClick={this.onButtonClicked}>{this.props.name}</button>
			</div>
		);
	}
}

class App extends React.Component
{
	constructor(props)
	{
		super(props);
		this.onButtonToggleFiltersClicked = this.onButtonToggleFiltersClicked.bind(this);
		this.onButtonResetMapsClicked = this.onButtonResetMapsClicked.bind(this);
		this.onButtonShuffleClicked = this.onButtonShuffleClicked.bind(this);
		this.SetMaps = this.SetMaps.bind(this);
		this.state = {
			mapsjobj: null,
			originalmaps: [],
			maps: [],
			hasShuffled: false,
			isShowingFilters: false,
			filtersRef: React.createRef()
		};
	}

	SetMaps(maps)
	{
		this.setState({
			maps: maps
		});
	}

	onButtonResetMapsClicked(e)
	{
		e.preventDefault();
		var maps = this.state.originalmaps.slice();
		this.SetMaps(maps);
		this.setState({
			hasShuffled: false
		});
		this.state.filtersRef.current.onCheckChanged();
	}

	onButtonShuffleClicked(e)
	{
		e.preventDefault();
		var maps = this.state.maps.slice();
		shuffle(maps);
		this.SetMaps(maps);
		this.setState({
			hasShuffled: true
		});
	}

	onButtonToggleFiltersClicked(e)
	{
		e.preventDefault();
		this.setState({
			isShowingFilters: !this.state.isShowingFilters
		});
	}

	componentDidMount()
	{
		fetch("./maps.json")
		.then(response => response.json())
		.then(jobj => {
			var maps = jobj.map((map) =>
			{
				var newRef = React.createRef();
				return <DisplayMap ref={newRef} map={map} key={map.name} />;
			});
			this.setState({
				mapsjobj: jobj,
				originalmaps: maps,
				maps: maps
			});
			this.state.filtersRef.current.onCheckChanged();
		});
	}

	render()
	{
		return (
			<div className="App">
				<header>
					<h1>Overwatch Map Picker</h1>
				</header>
				<div className="controls">
					{this.state.hasShuffled ? <OrangeButton name="Reset Maps" onClick={this.onButtonResetMapsClicked} /> : ''}
					<OrangeButton name="Shuffle Button" onClick={this.onButtonShuffleClicked} />
					<BlueButton name={this.state.isShowingFilters ? "Hide Filters" : "Show Filters"} onClick={this.onButtonToggleFiltersClicked} />
					<Filters ref={this.state.filtersRef} SetMaps={this.SetMaps} Maps={this.state.originalmaps} visible={this.state.isShowingFilters} />
				</div>
				{this.state.maps}
			</div>
		);
	}
}

export default App;
