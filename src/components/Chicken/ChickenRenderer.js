/* @flow */
import React from 'react';
import moment from 'moment';
import { Image, TouchableOpacity } from 'react-native';
import {
  Container, Content, Text, View, Button, H2, Icon,
} from 'native-base';
import ImageViewer from '../ImageViewer';
import Header from '../Header';
import Line from '../Line';
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
}: Props) => (
  <Container>
    <Header title="Chicken" eggButton goBackButton="Flock" />
    <Content>
      <ImageViewer
        toggleModal={toggleModal}
        showModal={showModal}
        url={chicken.photoUrl}
      />
      <View padder style={styles.rowContainer}>
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

        <View style={{ flex: 1 }}>
          <H2 style={{ fontWeight: 'bold', fontSize: 20 }}>{chicken.name}</H2>
          <Text style={{ height: 20, fontSize: 16, color: 'grey' }}>
            {chicken.breed}
          </Text>
          <Text style={{ height: 20, fontSize: 16, color: 'grey' }}>
            {!!chicken.hatched
              && chicken.hatched !== ''
              && `${moment(chicken.hatched).format('MMM D, YYYY')} (${calculateAge(
                chicken.hatched,
              )})`}
          </Text>
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
            <Icon active style={{ fontSize: 30 }} name="more" />
          </Button>
        </View>
      </View>
      <View padder style={{ alignItems: 'center' }}>
        <TouchableOpacity onPress={chicken.photoUrl ? () => toggleModal(!showModal) : null}>
          <Image
            style={{ width: 200, height: 200 }}
            source={
              chicken.photoUrl
                ? { uri: chicken.photoUrl }
                : require('../../assets/default-profile-photo.png')
            }
          />
        </TouchableOpacity>
      </View>

      {stats
        && stats.total > 0 && (
          <View padder>
            <Line />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 10,
              }}
            >
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                }}
              >
                <Text style={styles.label}>Total Eggs</Text>
                <H2 style={styles.h2}>{stats.total}</H2>
                <Text style={styles.text} />
              </View>
              {stats.heaviest && (
                <View style={{ flex: 1, alignItems: 'center' }}>
                  <Text style={[styles.label]}>Heaviest Egg</Text>
                  <H2 style={styles.h2}>
                    {stats.heaviest && stats.heaviest.weight}
                  </H2>
                  <Text style={styles.text}>
                    {stats.heaviest
                      && moment(stats.heaviest.date).format('MMM D, YYYY')}
                  </Text>
                </View>
              )}
              <View style={{ flex: 1, alignItems: 'center' }}>
                <Text style={[styles.label]}>Best Streak</Text>
                <H2 style={styles.h2}>{stats.longestStreak}</H2>
                <Text style={styles.text}>Days</Text>
              </View>
            </View>
            <Line />

            <View style={{ alignItems: 'center' }}>
              <Text style={[styles.label, { marginBottom: 10 }]}>
                Last Week
              </Text>
              <View>
                <View style={{ flexDirection: 'row' }}>
                  {Object.keys(stats.lastSevenDays || {}).map((key, index) => (
                    <View
                      key={key}
                      style={[
                        styles.dateCell,
                        stats.lastSevenDays[key] > 0
                          ? styles.dateCellSuccess
                          : null,
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
                            stats.lastSevenDays[key] > 0
                              ? 'checkmark-circle'
                              : 'close'
                          }
                        />
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          </View>
      )}
    </Content>
  </Container>
);

export default ChickenRenderer;
