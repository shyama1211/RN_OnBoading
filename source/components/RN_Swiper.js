import React, { Component } from "react";
import {
    AppRegistry,
    Image,
    TouchableOpacity,
    Text,
    Dimensions,
    Platform,
    ScrollView,
    StyleSheet,
    View, StatusBar
} from "react-native";
import {ActiveDot,InactiveDot} from '../images/index'
const { width, height } = Dimensions.get("window");
let iPad = Platform.isPad

export default class Swiper extends Component {

    static navigationOptions = {
        headerStyle: {
            backgroundColor: "#16a085",
            elevation: null
        }
    };
    // Props for ScrollView component
    static defaultProps = {
        horizontal: true,
        pagingEnabled: true,
        showsHorizontalScrollIndicator: false,
        showsVerticalScrollIndicator: false,
        bounces: false,
        scrollsToTop: false,
        removeClippedSubviews: true,
        automaticallyAdjustContentInsets: false,
        index: 0
    };

    state = this.initState(this.props);

    initState(props) {
        // Get the total number of slides passed as children
        const total = props.children ? props.children.length || 1 : 0,
            // Current index
            index = total > 1 ? Math.min(props.index, total - 1) : 0,
            // Current offset
            offset = width * index;

        const state = {
            total,
            index,
            offset,
            width,
            height
        };

        this.internals = {
            isScrolling: false,
            offset
        };

        return state;
    }


    onScrollBegin = e => {
        // Update internal isScrolling state
        this.internals.isScrolling = true;
    };

    onScrollEnd = e => {
        // Update internal isScrolling state
        this.internals.isScrolling = false;

        // Update index
        this.updateIndex(
            e.nativeEvent.contentOffset
                ? e.nativeEvent.contentOffset.x
                : // When scrolled with .scrollTo() on Android there is no contentOffset
                e.nativeEvent.position * this.state.width
        );
    };


    onScrollEndDrag = e => {
        const { contentOffset: { x: newOffset } } = e.nativeEvent,
            { children } = this.props,
            { index } = this.state,
            { offset } = this.internals;

        // Update internal isScrolling state
        // if swiped right on the last slide
        // or left on the first one
        if (
            offset === newOffset &&
            (index === 0 || index === children.length - 1)
        ) {
            this.internals.isScrolling = false;
        }
    };


    updateIndex = offset => {
        const state = this.state,
            diff = offset - this.internals.offset,
            step = state.width;
        let index = state.index;

        // Do nothing if offset didn't change
        if (!diff) {
            return;
        }

        // Make sure index is always an integer
        index = parseInt(index + Math.round(diff / step), 10);

        // Update internal offset
        this.internals.offset = offset;
        // Update index in the state
        this.setState({
            index
        });
    };


    swipe = () => {
        // Ignore if already scrolling or if there is less than 2 slides
        if (this.internals.isScrolling || this.state.total < 2) {
            return;
        }

        const state = this.state,
            diff = this.state.index + 1,
            x = diff * state.width,
            y = 0;

        // Call scrollTo on scrollView component to perform the swipe
        this.scrollView && this.scrollView.scrollTo({ x, y, animated: true });

        // Update internal scroll state
        this.internals.isScrolling = true;

        // Trigger onScrollEnd manually on android
        if (Platform.OS === "android") {
            setImmediate(() => {
                this.onScrollEnd({
                    nativeEvent: {
                        position: diff
                    }
                });
            });
        }
    };


    renderScrollView = pages => {
        return (
            <ScrollView
                ref={component => {
                    this.scrollView = component;
                }}
                {...this.props}
                contentContainerStyle={[styles.wrapper, this.props.style]}
                onScrollBeginDrag={this.onScrollBegin}
                onMomentumScrollEnd={this.onScrollEnd}
                onScrollEndDrag={this.onScrollEndDrag}
            >
                {pages.map((page, i) => (
                    // Render each slide inside a View
                    <View style={[styles.fullScreen, styles.slide]} key={i}>
                        {page}
                    </View>
                ))}
            </ScrollView>
        );
    };


    renderPagination = () => {
        if (this.state.total <= 1) {
            return null;
        }

        // const ActiveDot = <View style={[styles.dot, styles.activeDot]} />,
        //   Dot = <View style={styles.dot} />;

        const ActiveDot = <Image source={ActiveDot} style={[styles.dot, styles.activeDot]}/>,
            Dot = <Image source={InactiveDot} style={styles.dot} />

        let dots = [];

        for (let key = 0; key < this.state.total; key++) {
            dots.push(
                key === this.state.index
                    ? // Active dot
                    React.cloneElement(ActiveDot, { key })
                    : // Other dots
                    React.cloneElement(Dot, { key })
            );
        }

        return (
            <View pointerEvents="none" style={[styles.pagination, styles.fullScreen]}>
                {dots}
            </View>
        );
    };

    renderButton = () => {
        const lastScreen = this.state.index === this.state.total - 1;
        return (
            <View
                pointerEvents="box-none"
                style={[styles.buttonWrapper, styles.fullScreen]}
            >
                {lastScreen ? (
                    // Show this button on the last screen
                    // TODO: Add a handler that would send a user to your app after onboarding is complete
                    <TouchableOpacity   onPress={() => alert("Add Navigation In Which You Want To Go After End Of Onboarding")}>
                        <View style={{height:height/14,width:width/1.7,alignItems:'center',
                            backgroundColor:'#FA7857',borderRadius:(height/14)/2,justifyContent:'center',marginTop:0}}>
                            <Text style={{ fontSize:20,
                                color: '#FFFFFF',
                                fontWeight:'bold',
                                textAlign: 'center'}}>Lets Go</Text>
                        </View>
                    </TouchableOpacity>
                ) : (
                    // Or this one otherwise
                    <TouchableOpacity onPress={() => this.swipe()}>
                        <View style={{height:height/14,width:width/1.7,alignItems:'center',borderColor:'#F9DACA',borderWidth:2,
                            backgroundColor:'transparent',borderRadius:(height/14)/2,justifyContent:'center',marginTop:0}}>
                            <Text style={{ fontSize:20,
                                color: '#F9DACA',
                                fontWeight:'bold',
                                textAlign: 'center'}}>Next</Text>
                        </View>
                    </TouchableOpacity>

                )}
            </View>
        );
    };

    /**
     * Render the component
     */
    render = ({ children } = this.props) => {
        return (
            <View style={[styles.container, styles.fullScreen]}>
                <StatusBar hidden />
                {/* Render screens */}
                {this.renderScrollView(children)}
                {/* Render pagination */}
                {this.renderPagination()}
                {/* Render Continue or Done button */}
                {this.renderButton()}
            </View>
        );
    };
}

const styles = StyleSheet.create({
    // Set width and height to the screen size
    fullScreen: {
        width: width,
        height: height
    },
    // Main container
    container: {
        backgroundColor: "transparent",
        position: "relative"
    },
    // Slide
    slide: {
        backgroundColor: "transparent"
    },
    // Pagination indicators
    pagination: {
        position: "absolute",
        bottom: 110,
        left: 0,
        right: 0,
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "flex-end",
        backgroundColor: "transparent"
    },
    // Pagination dot
    dot: {
        borderRadius: 4,
        marginLeft: 3,
        marginRight: 3,
        ...Platform.select({
            ios: {
                marginBottom:height>700?60:5,
                width:height>700?22:17,
                height: height>700?22:17
            },
            android: {
                marginBottom:height>700?50:10,
                width:height>700?22:17,
                height: height>700?22:17
            },
        }),


    },
    // Active dot
    activeDot: {
        // backgroundColor: "#FFFFFF"
        ...Platform.select({
            ios: {
                marginBottom:height>700?60:5,
                width:height>700?22:17,
                height: height>700?22:17
            },
            android: {
                marginBottom:height>700?50:10,
                width:height>700?22:17,
                height: height>700?22:17
            },
        }),
    },
    // Button wrapper
    buttonWrapper: {
        backgroundColor: "transparent",
        flexDirection: "column",
        position: "absolute",
        bottom: 0,
        left: 0,
        flex: 1,
        paddingHorizontal: 10,
        justifyContent: "flex-end",
        alignItems: "center",
        ...Platform.select({
            ios: {
                paddingVertical:iPad ?10:height>700?20:40,
                marginBottom:iPad?40:height>700?60:5,
            },
            android: {
                paddingVertical:iPad ?10:height>700?20:40,
                marginBottom:iPad?40:height>700?60:5,

            },
        }),
    }
});
