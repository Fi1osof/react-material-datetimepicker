/**
 * Created by i.lovenkov on 20.11.16.
 */

"use strict";

import React, {Component, PropTypes} from 'react';
import moment from 'moment';

import {Week} from './Week';

export default class Calendar extends Component {
    static propTypes = {
        day: PropTypes.string.isRequired,
        month: React.PropTypes.string.isRequired,
        year: React.PropTypes.string.isRequired,
        handleChangeMonth: PropTypes.func.isRequired,
        handleChangeDay: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);
    }

    handleClickOnNextMonth = () => {
        const {handleChangeMonth, month} = this.props,
            newMonthID = parseInt(moment().set({'month': month}).month(), 10) + 1;

        handleChangeMonth(moment().month(newMonthID).format('MMMM'));
    };

    handleClickOnPrevMonth = () => {
        const {handleChangeMonth, month} = this.props,
            newMonthID = parseInt(moment().set({'month': month}).month(), 10) - 1;

        handleChangeMonth(moment().month(newMonthID).format('MMMM'));
    };

    render() {
        const {day, month, year, handleChangeDay} = this.props;

        let result = [],
            numberWeek = moment().set({'date': 1, 'month': month, 'year': year}).week();

        if (month === "январь") {
            for (let i = 1; i < 7; ++i) { // отображаем 6 недель календаря
                result.push(
                    <Week
                        key={"Week_" + i}
                        day={day}
                        week={i}
                        month={month}
                        year={year}
                        handleChangeDay={handleChangeDay}
                    />
                );
            }
        } else {
            for (let i = numberWeek; i < numberWeek + 6; ++i) { // отображаем 6 недель календаря
                result.push(
                    <Week
                        key={"Week_" + i}
                        day={day}
                        week={i}
                        month={month}
                        year={year}
                        handleChangeDay={handleChangeDay}
                    />
                );
            }
        }

        return (
            <div className="c-datepicker__calendar">
                <div className="c-datepicker__calendar" id="inline-block">
                    <div className="c-datepicker__date">
                        <div className="c-datepicker__month">
                            <button className="c-datepicker__back" type="button" onClick={this.handleClickOnPrevMonth}/>
                            <button className="c-datepicker__next" type="button" onClick={this.handleClickOnNextMonth}/>
                            <div className="rd-month-label">{month} {year}</div>
                            <table className="c-datepicker__days">
                                <thead className="c-datepicker__days-head">
                                <tr className="c-datepicker__days-row">
                                    <th className="c-datepicker__day-head">Пн</th>
                                    <th className="c-datepicker__day-head">Вт</th>
                                    <th className="c-datepicker__day-head">Ср</th>
                                    <th className="c-datepicker__day-head">Чт</th>
                                    <th className="c-datepicker__day-head">Пт</th>
                                    <th className="c-datepicker__day-head">Сб</th>
                                    <th className="c-datepicker__day-head">Вс</th>
                                </tr>
                                </thead>
                                <tbody className="c-datepicker__days-body">
                                {result}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}