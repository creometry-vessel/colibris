import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { WithContext as ReactTags } from 'react-tag-input';

const suggestions = []

const KeyCodes = {
  comma: 188,
  enter: 13
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

export default function App(props) {
    const {cities, setCities, weekday, ...other} = props;
  const [tags, setTags] = React.useState([]);
  useEffect(()=>{
    let tab = cities.map((city)=>{
        return {id: city, text: city}
    })
    setTags(tab);
  }, [])
  const handleDelete = i => {
    setTags(tags.filter((tag, index) => index !== i));
    setCities(cities.filter((city, index)=> index != i));
  };
  function capitalizeTheFirstLetterOfEachWord(words) {
    var separateWord = words.toLowerCase().split(' ');
    for (var i = 0; i < separateWord.length; i++) {
       separateWord[i] = separateWord[i].charAt(0).toUpperCase() +
       separateWord[i].substring(1);
    }
    return separateWord.join(' ');
 }
  const handleAddition = tag => {
    tag.id = capitalizeTheFirstLetterOfEachWord(tag.id);
    tag.text = capitalizeTheFirstLetterOfEachWord(tag.text)
    setTags([...tags, tag]);
    setCities([...cities, tag.id])
  };
  const Submit = ()=>{
    fetch('config/ZONE_SERVICE_URI')
      .then((r) => r.text())
      .then( ZONE_SERVICE_URI  => {
        axios.patch(`${ZONE_SERVICE_URI}/${weekday}`, {cities: cities}).then(res=>{
          props.handleClose();
        })         
      })
  }
  return (
    <div className="app center">
      <h3> {weekday} </h3>
      <div>
        <ReactTags
          tags={tags}
          className="form-control"
          suggestions={suggestions}
          delimiters={delimiters}
          handleDelete={handleDelete}
          handleAddition={handleAddition}
          inputFieldPosition="bottom"
          autocomplete
        />
        <button className='btn btn-primary mt-3' onClick={Submit}>Update</button>
      </div>
    </div>
  );
};

