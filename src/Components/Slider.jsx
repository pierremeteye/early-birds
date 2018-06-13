import React, {Component} from 'react';

var slideIndex = 0;
var classList = () => {
	setTimeout(function() {
		document.querySelectorAll('.zmdi-circle-o')[slideIndex].classList.add("zmdi-circle");
	}, 100)
}

export default class Slider extends Component {

	constructor(props) {
		super(props);
		this.state = {
			slide: 0
		};
	}

	nextSlide(el) {
		if (slideIndex < 19) {
			slideIndex += 1;
		} else {
			slideIndex = 0;
		}
		this.setState(nextSlide => ({
			slide: slideIndex
		}));
		classList();
	}
	prevSlide(el) {
		if (slideIndex > 0) {
			slideIndex -= 1;
		} else {
			slideIndex = 19;
		}
		this.setState(prevSlide => ({
			slide: slideIndex
		}));
		classList();
	}
	dotsClick(el) {
		slideIndex = el;
		this.setState(dotsClick => ({
			slide: slideIndex
		}));
		classList();
	}

	componentDidMount() {
		classList();
	}

	render() {
		if (this.props.data && slideIndex >= 0) {
			var movies = this.props.data[slideIndex],
			maxMovies = this.props.data.length;

			var dots = this.props.data.map((dot, i) => {
				return(
					<i className="zmdi zmdi-circle-o pointer" onClick={this.handleClick} key={dot.id}></i>
					)
			})
			var notation = "<ul></ul>";
			for (var i = 0; i < Math.round(movies.vote_average); i++) {
				notation+='<li class="inline"><i class="zmdi zmdi-star yellow fs-30"></i></li>';
			}

			for (var i = 0; i < 10 - Math.round(movies.vote_average); i++) {
				notation+='<li class="inline"><i class="zmdi zmdi-star-outline yellow fs-30"></i></li>';
			}

			function createNotation() {
				return {__html: notation};
			}

			return(
				<div>
					<div className="fullCentered center" key={movies.id}>
						<div className="movie-title center">
							<h1 className="m-b-20">{movies.title}</h1>
							<div className="col-12 m-b-30" dangerouslySetInnerHTML={createNotation()}>
							</div>
						</div>
						<div className="col-6 f-l">
							<img src={"https://image.tmdb.org/t/p/w500" + movies.poster_path} className="" />
						</div>
						<div className="col-6 f-l">
							<p>{movies.overview}</p>
						</div>
						<div className="both"></div>
						<div className="relative col-10 offset-col-1 f-l">
							<div onClick={this.prevSlide.bind(this, i)} className='col-6 f-l'>
								<i className="zmdi zmdi-chevron-left fs-50 f-r m-l-50 pointer"></i>
							</div>
							<div onClick={this.nextSlide.bind(this, i)} className='col-6 f-l'>
								<i className="zmdi zmdi-chevron-right fs-50 f-l m-l-50 pointer"></i>
							</div>
						</div>
						<div className="col-12 f-l">
							{dots}				
						</div>
					</div>
				</div>
				)
		}
		return (
			<div className="slider">
			{movies}
			</div>
			);
	}
}