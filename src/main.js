import React from 'react';
import {render} from 'react-dom';

import {clsx as x} from 'clsx';

import s from 'scss/main.scss';
import dSkills from 'data/skills.json';
import dCerts from 'data/certs.json';

const ws = (s) => {
	return s.replaceAll(' ', '\u00A0')
}; // Replace whitespace for React

const maxLength = 65; // Max line length
const art = ws(`
  _/          _/       _/      _/       _/      _/       _/_/_/_/
 _/          _/         _/  _/         _/_/  _/_/       _/       
_/    _/    _/           _/           _/  _/  _/       _/_/_/    
 _/  _/  _/           _/  _/         _/      _/       _/         
  _/  _/           _/      _/       _/      _/       _/_/_/_/    
`); // ASCII art


const cF = (string, width, character) => {
	const l = string.length;
	if (!character) character = '\u00A0';
	if (!width) width = 65;

	if (l < width) {
		let n = l;
		while (n < width) {
			string += character;
			n++
		}
	}

	return string.toString();
};


const HorizontalLine = (color, weight) => {
	return (<span className={x(s.line, (color && s[`c-${color}`]), (weight && s[`w-${weight}`]))}>{cF('', 65, '—')}</span>)
}

const Wxme = ({className}) => {
	return (
		<p className={className}>{art}</p>
	);
}

const Block = ({className, index, label, children})=> {
	return (
		<div className={x(s.block, className)}>
			{label ? <BlockHeader index={index} label={label} /> : ''}
			{children}
		</div>
	);
};

const BlockHeader = ({className, index, label}) => {
	return (
		<h1 className={x(s['block__header'], className)}>
			<HorizontalLine />
			{index ? <span className={s['header__index']}>[{index}] </span> : ""}{label}
		</h1>
	);
};

const Bullet = ({children, color}) => {
	return (<span className={x(s.bullet, s['c-grey'])}>[<span className={s[`c-${color}`]}>{children}</span>]</span>)
}

const ListItem = ({children, spacing, bullet, bulletColor}) => {
	return (<li className={x((spacing === true) && s['mb-lot'])}><Bullet color={bulletColor || 'green'}>{bullet || '-'}</Bullet> {children}</li>)
}

const TB = ({children}) => {
	return (<span className={s['table__border']}>{children}</span>)
}

const TH = ({children}) => {
	return (<span className={s['table__header']}>{children}</span>)
}

const TC = ({children}) => {
	return (<span className={x(s['table__cell'], (children === 'null') && s['c-grey'])}>{cF(children,14)}</span>)
}

const TR = ({cells}) => {
	if (cells.length > 4) return;

	while (4-cells.length !== 0) {
		cells.push('null')
	}

	return (
		<span className={(s['table__row'])}>{cells.map((item, i) => {
			return <TC key={i}>{(item ? item : 'null')}</TC>
		})}</span>
	)
}

const Table = ({data}) => {
	return (
		<p className={s.table}>
			<TB>{cF('',65, '.')}</TB>
			{
				(typeof data[0] === 'object') ? data.map((item, i)=> {
					if (!item.category || !item.content) return;
					return (
						<>
							<TH>{cF(item.category, 61)}</TH>
							<TB>:{cF('', 15)}+{cF('', 15)}+{cF('', 15)}+{cF('', 15)}:</TB>
							{item.content.reduce((ac, cV, i, arr) => {
								if (i % 4 === 0) {
									ac.push(arr.slice(i, i + 4))
								}

								return ac;
							}, []).map((a, i) => {
								return <TR cells={a} key={i}/>
							})}
							{'\n'}
							{data.length-1 > i ? (<TB>:{cF('', 15, '.')}:{cF('', 15, '.')}:{cF('', 15, '.')}:{cF('', 15, '.')}:</TB>) : ''}
						</>
					)
				}) : data.reduce((ac, cV, i, arr ) => {
					if (i % 4 === 0) {
						ac.push(arr.slice(i, i + 4))
					}

					return ac;
				}, []).map((a, i) => {
					return <TR cells={a} key={i} />
				})
			}
			{'\n'}
			<TB>:{cF('',15, '.')}:{cF('',15, '.')}:{cF('',15, '.')}:{cF('',15, '.')}:</TB>
		</p>)
}

const Skills = () => {
	const {skillMatrix, extras} = dSkills;
	return (
		<>
			<Table data={skillMatrix} />
			<p className={x(s['c-green'], s['m-0'])}><Bullet color={'green'}>+</Bullet> exploring the following:</p>
			<Table data={extras} />
		</>
	)
}

const Certs = () => {
	const {certs} = dCerts;

	return (
		<ul>
			{certs.map((cert, i) => {
				return (
					<ListItem spacing={true} bullet={'-'} bulletColor={'green'} key={i}>
						<p><span className={x(s['c-green'])}>{cert.name}</span> by <span className={s.i}>{cert.body}</span>.<br/>
							<span className={x(s['c-grey'], s.i)}>Issued {cert.issued}. ID: <a href={cert.url} title={`Confirm ${cert.name} credential authenticity`}>{cert.id}</a>.</span>
							</p>
					</ListItem>
				)
			})}
		</ul>
	)
}

const App = () => {
	return (
		<div className={s.container}>
			<Block className={s.block}>
				<p className={s['c-grey']}>Initializing /usr/wirkijowski/website.sh...</p>
			</Block>
			<Block className={x(s['c-red'])}>
				<Wxme className={s['w-extrabold']} />
				<p>{cF('',13)}doing everything that needs to be done.</p>
				<p className={s['w-extrabold']}>
					<HorizontalLine/>
					<span className={s.i}>WXME / Sebastian Wirkijowski ............................ v0.23.1</span>
					<HorizontalLine/>
				</p>
				<p>Welcome {`<unknown user>`},</p>
				<p>This is my personal website. Sorry to let You down, but it’s not
					an interactive terminal. Maybe this will change in the future.</p>
				<p>In the meantime, here’s everything that I think you would want to
					know about me before hiring me or my company to work with you.</p>
			</Block>
			<Block index={1} label={"About me:"}>
				<p>A curious and ambitious person, keen to explore every what-if.<br />
					I do everything that needs to be done, and because I'm a
					perfectionist - it will be done correctly. Very wide interests.</p>
				<p>I like new challenges and always give my all.</p>
				<p>Lately I've been focusing on personal development by studying
					art, exploring the electrical trade with some DIY projects and
					brushing up my Japanese skills.</p>
				<p>Programming since 2013.</p>
				<p>Born in 2001, Poland.</p>
			</Block>
			<Block index={2} label={"Areas of expertise:"}>
				<ul>
					<ListItem>Web development&nbsp;<span className={s.i}>(full-stack)</span></ListItem>
					<ListItem>Search Engine Optimization</ListItem>
					<ListItem>APIs</ListItem>
					<ListItem>Graphic & UI design</ListItem>
					<ListItem>Database design</ListItem>
					<ListItem>More than basic secure development knowledge</ListItem>
					<ListItem>E-commerce solutions</ListItem>
					<ListItem>IT operations</ListItem>
					<ListItem>Security systems & CCTV</ListItem>
					<ListItem>Electrical engineering&nbsp;<span className={s.i}>(amateur)</span></ListItem>
					<ListItem>International logistics and transport of persons</ListItem>
					<ListItem>Rental property management</ListItem>
					<ListItem>POS and restaurant management systems</ListItem>
				</ul>
			</Block>
			<Block index={3} label={"Skill matrix:"}>
				<Skills />
			</Block>
			<Block index={4} label={"Soft skills and other abilities:"}>
				<ul>
					<ListItem>Eye for details and aesthetic intelligence</ListItem>
					<ListItem>Critical thinking and problem solving skills</ListItem>
					<ListItem>Flexibility</ListItem>
					<ListItem>Leadership experience</ListItem>
					<ListItem>English proficient</ListItem>
					<ListItem>Entry level Japanese</ListItem>
					<ListItem>Limited working proficiency German</ListItem>
					<ListItem>International Sailing School Association certified</ListItem>
				</ul>
			</Block>
			<Block index={5} label={"What I did for fun:"}>
				<ul>
					<ListItem spacing={true} bullet={'1'} bulletColor={'red'}>
						<p><span className={x(s['c-red'], s['w-extrabold'])}>TGR > GamingNow</span> was a gaming and e-sports news website, which I was
						an editor-in-chief of. At it’s peak we had 6 talented editors
						writing articles and game reviews for a growing audience. A
						significant growth point was a start of a series of
						interviews with well known figures of the Polish amateur
						e-sports scene.</p>
					</ListItem>
					<ListItem spacing={true} bullet={'2'} bulletColor={'red'}>
						<p><span className={x(s['c-red'], s['w-extrabold'])}>Freelance Web Development</span> — I used to build functional
						WordPress websites within days, using fully self-made themes
						and a handful of plugins for amateur e-sports organizations,
						private persons and small businesses. Because of that I
						developed an aversion towards interactive agencies that use
						pre-built solutions to provide websites at highly inflated
						costs, without doing any creative work to make the projects
						stand out.</p>
					</ListItem>
					<ListItem spacing={true} bullet={'3'} bulletColor={'red'}>
						<p><span className={x(s['c-red'], s['w-extrabold'])}>Evitas & Katoa</span> were amateur e-sports organizations in which
						I had an opportunity to be a part of the management teams. I
						was tasked with providing the infrastructure for the players
						to train on, building and maintaining a website and taking
						care of social media accounts.</p>
					</ListItem>
					<ListItem spacing={true} bullet={'4'} bulletColor={'red'}>
						<p><span className={x(s['c-red'], s['w-extrabold'])}>Arecords</span> was my very own take on a Japanese animation
						database. Project went through many stages, but was never
						made publicly available, due to lack of drive. At one point
						the team consisted of 10 beginner developers and graphic
						designers in total.</p>
					</ListItem>
					<ListItem spacing={true} bullet={'5'} bulletColor={'red'}>
						<p><span className={x(s['c-red'], s['w-extrabold'])}>Cerber</span> was my first-hand experience with the e-commerce
						sector. I used this opportunity to experiment with the
						dropshipping sales model via Shopify & AliExpress. During
						that time I had to learn how to efficiently use Google and
						Meta Ads to promote my products, basic marketing strategies
						to boost traffic and drive customer conversion. Project ended
						because I got bored. At it’s peak I managed a team of 4
						people.</p>
					</ListItem>
				</ul>
			</Block>
			<Block index={6} label={"Certificates:"}>
				<Certs />
			</Block>
			<Block index={7} label={"What can I do for You?"}>
				<ul>
					<ListItem bullet={'a'} bulletColor={'green'}>
						<p><span className={x(s['c-green'])}>Consulting</span> on any of the things that I mentioned</p></ListItem>
					<ListItem bullet={'b'} bulletColor={'green'}>
						<p><span className={x(s['c-green'])}>Development</span> work in your team</p>
					</ListItem>
					<ListItem bullet={'c'} bulletColor={'green'}>
						<p><span className={x(s['c-green'])}>Design/User Experience</span> work in your team</p>
					</ListItem>
					<ListItem bullet={'d'} bulletColor={'green'}>
						<p><span className={x(s['c-green'])}>Security & CCTV</span> solutions for your home or business</p>
					</ListItem>
					<ListItem bullet={'e'} bulletColor={'green'}>
						<p><span className={x(s['c-green'])}>POS</span> solutions for your restaurant or store</p>
					</ListItem>
					<ListItem bullet={'f'} bulletColor={'green'}>
						<p>Help you <span className={x(s['c-green'])}>brainstorm a script</span> for your series idea pilot</p>
					</ListItem>
					<ListItem bullet={'g'} bulletColor={'green'}>
						<p>Get my company to provide an <span className={x(s['c-green'])}>almost 360deg service</span> of your business</p>
					</ListItem>
					<ListItem bullet={'h'} bulletColor={'green'}>
						<p><span className={x(s['c-green'])}>Pro bono work</span> for your interesting project or non-profit</p>
					</ListItem>
				</ul>
			</Block>
			<Block>
				<p className={x(s['w-extrabold'], s['c-red'])}>
					<HorizontalLine/>
					Got an interesting project or idea? I'm always up for a challenge<br />
					<br />
					{cF('',18)}{'>>'} <a href={'mailto:sebastian@wirkijowski.me'}>CLICK HERE TO E-MAIL ME</a> {'<<'}
					<br />
					{cF('',17)}<span className={x(s['w-normal'], s['c-grey'])}>or ( sebastian@wirkijowski.me )</span>
					<HorizontalLine/>
				</p>
				<p className={x(s['w-extrabold'], s['c-green'])}>
					[>] <a href={"https://linkedin.com/in/sebastian-wirkijowski"}>PERSONAL LINKEDIN</a>
					{cF('',12)}
					[>] <a href={"https://wirkijowski.group"}>WIRKIJOWSKI.GROUP</a>
				</p>
			</Block>
			<Block>
				<p className={s['c-grey']}>Made with Earl Grey by Sebastian Wirkijowski. All right reserved.</p>
				<p className={s['c-grey']}>Exit 0</p>
			</Block>
		</div>
	);
};

console.log(art);

render(<App/>, document.getElementById('root'));