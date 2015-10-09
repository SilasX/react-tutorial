var Image = React.createClass({
  /*componentDidMount: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'image/jpeg',
      cache: true,
      success: function(data) {
        this.setState({imageRawData: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },*/

  render: function() {
    return (
      <div>
        <div>
          The image I see is&nbsp;
          <a href={this.props.url}>here</a> and looks like this:
        </div>
        <div>
          <img 
            className="some-image"
            src={this.props.url}
          />
        </div>
      </div>
    );
  }
});

var ImageApp = React.createClass({
  getInitialState: function() {
    return {
      imgUrls: []
    };
  },

  componentDidMount: function() {
    $.ajax({
      method: "GET",
      url: this.props.source,
      cache: false,
      success: function(result) {
        if (this.isMounted()) {
          this.setState({
            imgUrls: result
          });
        }
      }.bind(this)
    });
  },

  render: function() {
    var imageNodes = this.state.imgUrls.map(function (imgUrl) {
      return (
        <Image url={imgUrl} key={imgUrl}>
        </Image>
      );
    });
    return (
      <div className="imageApp">
        {imageNodes}
      </div>
    );
  }
});

React.render(
  <ImageApp source="/data/cachelink.json" />,
  document.getElementById('content')
);
