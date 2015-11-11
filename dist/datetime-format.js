/****************************************************************************
	datetime-format, Format for Moment-object with different timezones

	(c) 2015, Niels Holt

	https://github.com/NielsHolt/datetime-format
	https://github.com/NielsHolt

date					: 'DMY', 'MDY', 'YMD'
dateId				: integer : 0-7
time					: '12', '24'
localAsString	: 'local'
timezones			: [] of {id, name, momentTzId}
timezone			: string ('local')
****************************************************************************/

;(function ($, window, document, undefined) {
	"use strict";

	function DateTimeFormat( options ) {
		options = options || {};
		this.options = $.extend({
			date					: 'DMY',
			dateId				: 2,
			time					: '24',
			timezone			: 'local',
			utcAsString		: 'UTC',
			localAsString	: 'local',
		}, options );

		//Different date-formats in a 3-dim array. eq. dateFormats[2][0] = 'DD. MMM YYYY'
		this.dateFormats = [
			['dddd, DD. MMMM YYYY', 'dddd, MMMM DD, YYYY'	, 'dddd, YYYY MMMM DD'],	//Monday, 24. December 2015 | Monday, December 24, 2015 | Monday, 2015 December 24
			['ddd, DD. MMMM YYYY'	, 'ddd, MMMM DD, YYYY'	, 'ddd, YYYY MMMM DD'	],	//Mon, 24. December 2015		| Monday, December 24, 2015 | Mon, 2015 December 24
			['ddd, DD. MMM YYYY'	, 'ddd, MMM DD, YYYY'		, 'ddd, YYYY MMM DD'	],	//Mon, 24. Dec 2015					| Mon Dec 24, 2015					| Mon 2015 Dec 24
			['ddd, DD. MMM YY'		, 'ddd, MMM DD, YY'			, 'ddd, YY MMM DD'		],	//Mon, 24. Dec 15						| Mon Dec 24, 15						| Mon 15 Dec 24
			['DD. MMM YYYY'				, 'MMM DD, YYYY'				, 'YYYY MMM DD'				],	//24. Dec 2015							| Dec 24, 2015							| 2015 Dec 24
			['DD. MMM YY'					, 'MMM DD, YY'					, 'YY MMM DD'					],	//24. Dec 15								| Dec 24, 15								| 15 Dec 24
			['DD/MM/YYYY'					, 'MM/DD/YYYY'					, 'YYYY/MM/DD'				],	//24/12/2015								| 12/24/2015								| 2015/12/24
			['DD/MM/YY'						, 'MM/DD/YY'						, 'YY/MM/DD'					]		//24/12/15									| 12/24/15									| 15/12/24
		];
		this.maxDateId = this.dateFormats.length - 1;

		//**********************************************************
		this.addTimezone = function addTimezone(options){
			options.momentTzId = options.momentTzId || options.id;
			var offset = 0;
			switch (options.momentTzId){
				case 'local': offset = (new Date()).getTimezoneOffset();	break;
				case 'utc'	: offset = null; break;
				default			: offset = window.moment.tz.zone(options.momentTzId).parse(Date.UTC()); break;
			}
			options.fullName = options.name;					  
			if (offset !== null){
				options.fullName += ' (UTC' + (offset<0?'+':'-');
				offset = Math.abs(offset);		
				var h = Math.floor(offset / 60),
						m = offset % 60;
				options.fullName += (h<10?'0':'') + h + ':' + (m<10?'0':'') + m + ')';
			}
			this.timezones.push(options);
		};
		this.timezones = [];
		this.addTimezone({ id:'utc',		name: this.options.utcAsString		});
		this.addTimezone({ id:'local',	name: this.options.localAsString	});
		if (options.timezones)
			for (var i=0; i<options.timezones.length; i++ )
				this.addTimezone( options.timezones[i] ); 			

		//**********************************************************
		this.setFormat = function setFormat( options ){
			$.extend( this.options, options ); 

			var formatIndex = ['DMY', 'MDY', 'YMD'].indexOf(this.options.date);
			this.options.dateId = Math.max(0, Math.min(this.options.dateId, this.maxDateId));
			this.formatString = this.dateFormats[this.options.dateId][formatIndex];

			this.timezone = this.timezones[0];
			for (var i=0; i<this.timezones.length; i++ )
				if (this.timezones[i].id == this.options.timezone){
					this.timezone = this.timezones[i];
					break;
				}
			this.momentTzId = this.timezone.momentTzId;

			this.timeFormat = this.options.time == '24' ? 'HH:mm' : 'hh:mma';
		};
		this.setFormat( this.options );

		//**********************************************************
		this.tzMoment = function( m, timezone ) { 
			if (timezone == 'local') return m.local();
			if (timezone == 'utc') return m.utc();
			return m.tz( timezone );
		};

		this.dateAsString			= function( moment, options ){ return this._asString( moment, false, options );  };
		this.datetimeAsString	= function( moment, options ){ return this._asString( moment, true, options );  };

		this._asString = function( moment, inclTime, options ){
			//Save original options and use new options once
			var saveOptions = $.extend({}, this.options );
			this.setFormat( options );
			var formatStr = this.formatString + (inclTime ? ' ' + this.timeFormat : '');
					
			var result = this.tzMoment( moment, this.momentTzId ).format( formatStr );

			this.options = $.extend({}, saveOptions );		
			return result;
		};

	}
  
  // expose access to the constructor
  window.DateTimeFormat = DateTimeFormat;

}(jQuery, this, document));