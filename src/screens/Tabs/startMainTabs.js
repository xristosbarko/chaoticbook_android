import { Navigation } from 'react-native-navigation'
import Ionicons from 'react-native-vector-icons/Ionicons'

export const startMainTabs = (username) => {
    Promise.all([
        Ionicons.getImageSource("md-home", 30),
        Ionicons.getImageSource("md-search", 30),
        Ionicons.getImageSource("md-add-circle", 30),
        Ionicons.getImageSource("md-heart", 30),
        Ionicons.getImageSource("md-person", 30),
        Ionicons.getImageSource("md-menu", 30)
    ]).then(sources => {
        const bottomTabs = {
          id: 'MainTabs',
          children: [
            {
              stack: {
                children: [{
                  component: {
                    id: 'HomeScreenId',
                    name: 'HomeScreen'
                  },
                }],
                options: {
                  topBar: {
                    title: {
                      text: 'ChaoticBook'
                      }
                    },
                  bottomTab: {
                    text: 'Αρχική',
                    icon: sources[0],
                    testID: 'HOME_TAB_BAR_BUTTON'
                  }
                }
              }
            },
            {
              stack: {
                children: [{
                  component: {
                    id: 'SearchScreenId',
                    name: 'SearchScreen'
                  },
                }],
                options: {
                  topBar: {
                    title: {
                      text: 'Αναζήτηση'
                      }
                    },
                  bottomTab: {
                    text: 'Αναζήτηση',
                    icon: sources[1],
                    testID: 'SEARCH_TAB_BAR_BUTTON'
                  }
                }
              }
            },
            {
              stack: {
                children: [{
                  component: {
                    id: 'PostCreateScreenId',
                    name: 'PostCreateScreen'
                  },
                }],
                options: {
                  topBar: {
                    title: {
                      text: 'Προσθήκη'
                      }
                    },
                  bottomTab: {
                    text: 'Προσθήκη',
                    icon: sources[2],
                    testID: 'POST_CREATE_TAB_BAR_BUTTON'
                  }
                }
              }
            },
            {
              stack: {
                children: [{
                  component: {
                    id: 'NotificationsScreenId',
                    name: 'NotificationsScreen'
                  },
                }],
                options: {
                  topBar: {
                    title: {
                      text: 'Ειδοποιήσεις'
                    }
                  },
                  bottomTab: {
                    text: 'Ειδοποιήσεις',
                    icon: sources[3],
                    testID: 'NOTIFICATIONS_TAB_BAR_BUTTON'
                  }
                }
              }
            },
            {
              stack: {
                children: [{
                  component: {
                    id: 'ProfileScreenId',
                    name: 'ProfileScreen'
                  },
                }],
                options: {
                  topBar: {
                    title: {
                      text: username
                    },
                    rightButtons: [
                      {
                        id: 'MenuDrawerButton',
                        icon: sources[5]
                      }
                    ]
                  },
                  bottomTab: {
                    text: 'Προφίλ',
                    icon: sources[4],
                    testID: 'PROFILE_TAB_BAR_BUTTON'
                  }
                }
              }
            }
          ]
        }
        Navigation.setRoot({
          root: {
            sideMenu: {
              right: {
                visible: false,
                component: {
                  name: 'MenuDrawerScreen'
                }
              },
              center: {
                 bottomTabs: bottomTabs
              }
            }
          }
        })
        const bottomTabEventListener = Navigation.events().registerBottomTabSelectedListener(({ selectedTabIndex, unselectedTabIndex }) => {
          if (selectedTabIndex === unselectedTabIndex) {
            const componentId = bottomTabs.children[selectedTabIndex].stack.children[0].component.id
              Navigation.popToRoot(componentId).catch(() => {return})
          }
        })
    })
}