import React from 'react';
import './Region.css'

export default function Region() {
    return (
        <div>
            <h3>Country/Region</h3>
            <checklist>
                <label>
                    <input type="checkbox" />
                    Taiwan
                </label>
                <label>
                    <input type="checkbox" />
                    China
                </label>
                <label>
                    <input type="checkbox" />
                    Hong Kong
                </label>
                <label>
                    <input type="checkbox" />
                    Japan
                </label>
                <label>
                    <input type="checkbox" />
                    Korean
                </label>
                <label>
                    <input type="checkbox" />
                    Others
                </label>
            </checklist>
        </div>
    )
}