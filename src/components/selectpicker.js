import React from "react";

export default function selectpicker() {
  return (
    <div>
      <select>
        <option>Choose Style</option>
        <option>vinofdff</option>
      </select>

      {/* <select>
         {selectedValue== '' ? <option value="0">Choose Style</option> :''}
          {styles.map((e) => {
            return (
              <option key={e._id} value={e._id}>
                {e.sort[0]}
              </option>
            );
          })}
        </select> */}
    </div>
  );
}
