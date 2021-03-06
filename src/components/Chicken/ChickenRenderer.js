/* @flow */
import React from 'react';
import moment from 'moment';
import { Image, TouchableOpacity } from 'react-native';
import {
  Container,
  Content,
  Text,
  View,
  Button,
  H2,
  Icon,
  ListItem,
} from 'native-base';
import Separator from '../Separator';
import ImageViewer from '../ImageViewer';
import Header from '../Header';
import CommonLabel from '../CommonLabel';
import { type Chicken, type ChickenStats } from '../../types';
import styles from './styles';

type Props = {
  navigation: any,
  prevChickenId: string,
  nextChickenId: string,
  chicken: Chicken,
  stats: ChickenStats,
  showModal: boolean,
  toggleModal: boolean => void,
  handleMoreOptions: () => void,
  topProducer: boolean,
  heaviest: boolean,
};

const calculateAge = (hatched: string) => {
  const hatchedAsMoment = moment(hatched);
  const now = moment();
  const months = now.diff(hatchedAsMoment, 'months');
  const years = Math.floor(months / 12);
  if (years === 0) {
    return `${months}m`;
  }
  const remainingMonths = months - years * 12;
  return `${years}y ${remainingMonths}m`;
};

const ChickenRenderer = ({
  navigation,
  chicken,
  stats,
  prevChickenId,
  nextChickenId,
  handleMoreOptions,
  showModal,
  toggleModal,
  topProducer,
  heaviest,
}: Props) => (
  <Container>
    <Header title="Chicken" eggButton goBackButton="Flock" />
    <Content>
      <ImageViewer
        toggleModal={toggleModal}
        showModal={showModal}
        url={chicken.photoUrl}
      />
      <View style={styles.rowContainer}>
        <View style={styles.flex}>
          <H2 style={{ fontWeight: 'bold', fontSize: 20, marginLeft: 4 }}>
            {chicken.name}
          </H2>
        </View>
        <View>
          <Button
            transparent
            dark
            disabled={prevChickenId === null}
            onPress={() => (prevChickenId
              ? navigation.replace('Chicken', { chickenId: prevChickenId })
              : null)
            }
          >
            <Icon name="arrow-dropleft-circle" />
          </Button>
        </View>
        <View>
          <Button
            transparent
            dark
            disabled={nextChickenId === null}
            onPress={() => (nextChickenId
              ? navigation.replace('Chicken', { chickenId: nextChickenId })
              : null)
            }
          >
            <Icon name="arrow-dropright-circle" />
          </Button>
        </View>
        <View style={styles.rowContainer}>
          <Button transparent dark onPress={handleMoreOptions}>
            <Icon active style={styles.moreIcon} name="more" />
          </Button>
        </View>
      </View>
      <View style={styles.row}>
        <TouchableOpacity
          onPress={chicken.photoUrl ? () => toggleModal(!showModal) : null}
        >
          <Image
            style={styles.image}
            source={
              chicken.photoUrl
                ? { uri: chicken.photoUrl }
                : require('../../assets/default-profile-photo.png')
            }
          />
        </TouchableOpacity>
        <View style={styles.chickenInfo}>
          <View style={styles.fieldGroup}>
            <CommonLabel style={styles.label} text="Breed" />
            <Text style={styles.chickenInfoText}>{chicken.breed || '--'}</Text>
          </View>
          <View style={styles.fieldGroup}>
            <CommonLabel style={styles.label} text="Hatched" />
            <Text style={styles.chickenInfoText}>
              {(!!chicken.hatched
                && chicken.hatched !== ''
                && moment(chicken.hatched).format('MMM D, YYYY'))
                || '--'}
            </Text>
            {!!chicken.hatched
              && chicken.hatched !== '' && (
                <View style={styles.fieldGroup}>
                  <Text style={styles.chickenInfoText}>
                    ({calculateAge(chicken.hatched)})
                  </Text>
                </View>
            )}
          </View>
          <View style={styles.fieldGroup}>
            <CommonLabel style={styles.label} text="Gender" />
            <Text style={styles.chickenInfoText}>Female</Text>
          </View>
        </View>
      </View>
      <View>
        {(topProducer || heaviest) && (
          <View>
            <Separator text="AWARDS" />
            {topProducer && (
              <ListItem style={styles.li}>
                <Icon style={styles.trophyIcon} active name="trophy" />
                <Text style={styles.awardText}>Top Producer</Text>
              </ListItem>
            )}
            {heaviest && (
              <ListItem style={styles.li}>
                <Icon style={styles.trophyIcon} active name="trophy" />
                <Text style={styles.awardText}>Heaviest Egg</Text>
              </ListItem>
            )}
          </View>
        )}
        <Separator text="CHICKEN STATS" />
        <ListItem style={styles.li}>
          <View style={styles.flex}>
            <Text>Total Eggs Laid</Text>
          </View>
          <View>
            <Text>{stats.total || 0}</Text>
          </View>
        </ListItem>
        <ListItem style={styles.li}>
          <View style={styles.flex}>
            <Text>Last Egg</Text>
          </View>
          <View>
            <Text>
              {(stats.lastEgg
                && moment.utc(stats.lastEgg).format('MMM D, YYYY'))
                || '--'}
            </Text>
          </View>
        </ListItem>
        <ListItem style={styles.li}>
          <View style={styles.flex}>
            <Text>Longest Streak</Text>
          </View>
          <View>
            <Text>
              {`${stats.longestStreak || 0} day${
                stats.longestStreak === 1 ? '' : 's'
              }`}
            </Text>
          </View>
        </ListItem>
        <ListItem style={styles.li}>
          <View style={styles.flex}>
            <Text>Heaviest Egg</Text>
          </View>
          <View>
            <Text>
              {(stats.heaviest && stats.heaviest.weight) || '--'} grams
            </Text>
          </View>
        </ListItem>
        <Separator text="PAST 7 DAYS" />
        <View style={styles.pastWeekContainer}>
          {Object.keys(stats.lastSevenDays || {}).map((key, index) => (
            <View
              key={key}
              style={[
                styles.dateCell,
                stats.lastSevenDays[key] > 0 ? styles.dateCellSuccess : null,
                index === Object.keys(stats.lastSevenDays).length - 1
                  ? styles.lastCell
                  : null,
              ]}
            >
              <Text style={styles.dateCellLabel}>
                {moment(key).format('MMM')}
              </Text>
              <Text style={styles.dateCellLabel}>
                {moment(key).format('D')}
              </Text>
              <View>
                <Icon
                  style={styles.dateCellIcon}
                  name={
                    stats.lastSevenDays[key] > 0 ? 'checkmark-circle' : 'close'
                  }
                />
              </View>
            </View>
          ))}
        </View>
      </View>
    </Content>
  </Container>
);

export default ChickenRenderer;
