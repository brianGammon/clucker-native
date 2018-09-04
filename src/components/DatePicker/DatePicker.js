/* @flow */
import React from 'react';
import moment from 'moment';
import {
  DatePicker as NBDatePicker,
  View,
  Button,
  Icon,
  Label,
} from 'native-base';
import styles from './styles';

type Props = {
  clearable: boolean,
  label: string,
  value: Date | null,
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
      clearable, value, maximumDate, label,
    } = this.props;
    const valueAsDate = value && value !== '' ? new Date(moment(value).valueOf()) : null;
    return (
      <View style={styles.container}>
        <Label style={styles.label}>{label || 'Date'}:</Label>
        <View style={styles.datePickerField}>
          <NBDatePicker
            ref={this.datePickerRef}
            defaultDate={valueAsDate}
            // minimumDate={new Date(2018, 1, 1)}
            maximumDate={maximumDate}
            locale="en"
            modalTransparent={false}
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
