/* @flow */
import React from 'react';
import moment from 'moment';
import {
  DatePicker as NBDatePicker, View, Button, Icon,
} from 'native-base';
import CommonLabel from '../CommonLabel';
import { nowAsMoment } from '../../utils/dateHelper';
import styles from './styles';

type Props = {
  clearable: boolean,
  label: string,
  value: Date | null,
  minimumDate: Date | null,
  maximumDate: Date | null,
  onDateChange: (date: string) => void,
};

class DatePicker extends React.Component<Props> {
  datePickerRef: { current: null | NBDatePicker } = React.createRef();

  handleClearDate = () => {
    if (this.datePickerRef.current) {
      this.datePickerRef.current.setState({ chosenDate: undefined }, () => {
        if (this.datePickerRef.current) {
          this.datePickerRef.current.props.onDateChange(null);
        }
      });
    }
  };

  handleChangeDate = (date: Date | null) => {
    const { onDateChange } = this.props;
    let dateAsString = '';
    if (date) {
      dateAsString = moment(date).format('YYYY-MM-DD');
    }
    onDateChange(dateAsString);
  };

  render() {
    const {
      clearable, value, maximumDate, minimumDate, label,
    } = this.props;
    const valueAsDate = value && value !== '' ? new Date(moment(value).valueOf()) : null;
    return (
      <View style={styles.container}>
        <CommonLabel text={`${label || 'Date'}:`} />
        <View style={styles.datePickerField}>
          <NBDatePicker
            ref={this.datePickerRef}
            defaultDate={valueAsDate}
            minimumDate={
              minimumDate
              || new Date(
                nowAsMoment()
                  .subtract(2, 'year')
                  .valueOf(),
              )
            }
            maximumDate={maximumDate}
            locale="en"
            modalTransparent
            animationType="fade"
            androidMode="default"
            placeHolderTextStyle={styles.placeHolderTextStyle}
            onDateChange={this.handleChangeDate}
            formatChosenDate={date => moment(date).format('MMM DD, YYYY')}
          />
        </View>
        {valueAsDate
          && clearable && (
            <Button transparent onPress={this.handleClearDate}>
              <Icon style={styles.clearDateIcon} name="close-circle" />
            </Button>
        )}
      </View>
    );
  }
}

export default DatePicker;
