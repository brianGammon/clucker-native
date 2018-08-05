const sampleData1 = {
  userSettings: {
    key: 'user1',
    data: {
      currentFlockId: 'flock1',
    },
  },
  flocks: {
    data: {
      flock1: {
        name: 'Test Flock 1',
        ownedBy: 'user1',
      },
      flock2: {
        name: 'Test Flock 2',
        ownedBy: 'user2',
      },
    },
  },
  chickens: {
    data: {
      chicken1: {
        name: 'The First Chicken',
      },
      chicken2: {
        name: 'The Second Chicken',
      },
    },
  },
  eggs: {
    data: {
      egg1: {
        chickenId: 'chicken1',
        chickenName: 'Bossie',
        damaged: false,
        date: '2018-08-01',
        modified: '2018-01-12T18:05:54.806Z',
        notes:
          'This was the record setting egg from May 2017, real egg was 66.1g on this day',
        userId: 'MVQUEcoTaVUhUdo2ZS0zsIE6tn93',
        weight: 88.1,
      },
      egg2: {
        chickenId: 'chicken2',
        chickenName: 'Baby',
        damaged: false,
        date: '2017-09-24',
        modified: '2017-10-12T18:05:54.806Z',
        userId: 'MVQUEcoTaVUhUdo2ZS0zsIE6tn93',
        weight: 88.1,
      },
      egg3: {
        chickenId: 'chicken1',
        chickenName: 'Bossie',
        damaged: false,
        date: '2018-08-02',
        modified: '2018-08-02T18:05:54.806Z',
        notes: '',
        userId: 'MVQUEcoTaVUhUdo2ZS0zsIE6tn93',
        weight: 68.1,
      },
    },
  },
};

export default sampleData1;
