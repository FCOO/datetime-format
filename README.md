# datetime-format

## Description
Format for Moment-object with different timezones

## Installation
### bower
`bower install https://github.com/NielsHolt/datetime-format.git --save`

## Demo
http://NielsHolt.github.io/datetime-format/examples/

## Usage
```var myDateTimeFormat = new DateTimeFormat( options );```


### options
<table>
<tr>
<th>Id</th>
<th>Type</th> 
<th>Default</th>
<th>Description</th>
</tr>

<tr>
<td>date</td>
<td>String</td>
<td>'DMY'</td>
<td>The format of the date. Possible values: <code>'DMY'</code>, <code>'MDY'</code>, and <code>'YMD'</code></td>
</tr>

<tr>
<td>dateId</td>
<td>integer</td>
<td>4</td>
<td>The number for the format. See below</td>
</tr>

<tr>
<td>time</td>
<td>String</td>
<td>'24'</td>
<td>The format of the time. Possible values: <code>'12'</code> and <code>'24'</code></td>
</tr>

<tr>
<td>localAsString</td>
<td>String</td>
<td>'local'</td>
<td>The name for local time.</td>
</tr>

<tr>
<td>timezones</td>
<td>Array</td>
<td>null</td>
<td>A list of timezones available.<br> 
= [] of {id, name, momentTzId} 
<br>The timezone 'local' and 'UTC' are added by default</td>
</tr>

<tr>
<td>timezone</td>
<td>String</td>
<td>'local'</td>
<td>The current timezone to display the moment in. Posible values: 'local', 'utc' or an id added with <code>options.timezones</code> or by method <code>addTimezone(..)</code></td>
</tr>
</table>

#### dateId
0: Monday, 24. December 2015
1: Mon, 24. December 2015
2: Mon, 24. Dec 2015
3: Mon, 24. Dec 15
4: 24. Dec 2015
5: 24. Dec 15
6: 24/12/2015
7: 24/12/15

Only show for `date="DMY"`

### Methods

    .setFormat( {date:'YMD', dateId:2, time:'12', timezone:'utc'} );
    .addTimezone( {{id:'la', name:'America/LA', momentTzId:'America/Los_Angeles'} );

	.dateAsString( moment [, options] ); 
	.datetimeAsString( moment [, options] );


## Copyright and License
This plugin is licensed under the [MIT license](https://github.com/NielsHolt/datetime-format/LICENSE).

Copyright (c) 2015 [Niels Holt](https://github.com/NielsHolt)

## Contact information

Niels Holt <niels@steenbuchholt.dk>


## Credits and acknowledgements


## Known bugs

## Troubleshooting

## Changelog



