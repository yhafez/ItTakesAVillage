/*--------------------------------------------------------------------------------- Global Variables --------------------------------------------------------------------------------*/


const APP = $('#app');
const BASE_URL = 'https://strangers-things.herokuapp.com/api'

const STATE = {
    'token': '',
    'user': {},
    'posts-array': [],
    'messages-aray': [],
    'search': '',
    'fetch-header': {
    },
    'delete-post-id': '',
    'send-message-post-id': '',
    'view-message-post-id': '',
    'open-messages': [],
    'window-size': {
        height:0,
        width:0,
    }
};


/*----------------------------------------------------------------------------------- Functions ------------------------------------------------------------------------------------*/


//Stores the height and width of the window in STATE.
function getWindowDimensions() {
    
    const width = window.innerWidth;
    
    const windowSize = {
        width: window.innerWidth,
        height: window.innerHeight,
    }

    STATE['window-size'] = windowSize;

}


function renderLoadingScreen () {
    const loading = $(`
    <div id='loading-div'>
        <img class='loading' id='loading-main' src='./loading.gif' alt='Loading animation'>
        <h3 id='loading-alt'>Loading...</h3>
    </div>
    `)
    $('#app').append(loading);

    //Display alternate loading text if loading animation fails to load
    $('#loading-main').on('error', () => {
        $('#loading-main').css('display', 'none');
        $('#loading-alt').css('display', 'initial');
    })

}


function renderHeader() {
    const header = $(`
    <!-------------------------------------------------------------------------------- Header -------------------------------------------------------------------------------->        


    <header>

        <h1 id='alt-logo'> It Takes A Village</h1>
        <img id='logo' class='animated pulse delay-1s slow' src='./logo.png' alt='A wood-like font reading "It Takes a Village", the name of the webpage, with a raised fist in the background'/>
        <h2 id='sub-heading'>A Mutual Aid Community Directory</h2>

    </header>
    `);
    $('#app').prepend(header);

    //Display alternate, CSS-stylized logo, if primary logo-image fails to load
    $('#logo').on('error', () => {
        $('#logo').css('display', 'none');
        $('#alt-logo').css('display', 'initial');
    })

}


function renderNav() {

    const nav = $(`
    <!--------------------------------------------------------------------------------- Nav ----------------------------------------------------------------------------------->  
    <nav>

    <p class='hide'>Hide</p>

    <div id='all-nav'>
        <div  id='nav-buttons'>
            <button id='log-in-button'>Log In</button>
            <button id='sign-up-button'>Sign Up</button>
            <div class='notification' id='successful-log-out'>
                <p>You are now logged out</p>
            </div>
        </div>

        <div id='logged-in-nav'>
            <i class='material-icons account-icon'>account_circle</i>
            <div id='user-details'></div>
            <button id='new-post-button'>New Post</button>
            <button id='log-out-button'>Log Out</button> 

            <div class='notification' id='successful-sign-up'>
                <h3>Success!</h3>
                <p>You have registered successfully</p>
            </div>

            <div class='notification' id='successful-log-in'>
                <p>You are now logged in!</p>
            </div>
        </div>

        <div class='nav-form' id='sign-up'>

            <form id='sign-up-form'>
                
                <label for='sign-up-first-name'> First Name: </label>
                <br>
                <input id='sign-up-first-name' name='first-name' type='text' placeholder='First Name' minlength='2' maxlength='20' pattern="[a-z A-Z'-]+" title='Only alphabetic characters, apostrophes, and hyphens accepted' required />
                <br>

                <label for='sign-up-last-name'> Last Name: </label>
                <br>
                <input id='sign-up-last-name' name='last-name' type='text' placeholder='Last Name' minlength='2' maxlength='20' pattern="[a-z A-Z'-]+" title='Only alphabetic characters, apostrophes, and hyphens accepted' required />
                <br>

                <label for='sign-up-email'> E-Mail: </label>
                <br>
                <input id='sign-up-email' name='email' type='email' placeholder='E-Mail' minlength='8' maxlength='35' pattern='[a-zA-Z0-9-_+@.]+' title='Only alphanumeric characters, hyphens, underscores, pluses, and periods accepted' required />
                <br>

                <label for='sign-up-username'> Username: </label>
                <br>
                <input id='sign-up-username' name='username' type='text' placeholder='Username' minlength='5' maxlength='20' pattern='[a-zA-Z0-9]+' title='Only alphanumeric characters accepted' required />
                <br>

                <label for='sign-up-password'> Password: </label>
                <br>
                <input id='sign-up-password' name='password' type='password' placeholder='Password' minlength='8' maxlength='20' required />
                <br>

                <label for='sign-up-confirm-password'> Confirm Password: </label>
                <br>
                <input id='sign-up-confirm-password' name='confirm-password' type='password' placeholder='Confirm Password'  minlength='8' maxlength='20' required />
                <br>

                <button class='submit' id='submit-signup'>Submit</button>

                <div class='notification' id='password-mismatch'>
                    <p>Passwords must match.<br>Please try again.</p>
                </div>

                <div class='notification' id='username-taken'>
                    <p>Username already taken.<br>Please try again.</p>
                </div>

            </form>

        </div>

        <div class='nav-form' id='log-in'>
            
            <form id='log-in-form'>

                <label for='log-in-username'> Username: </label>
                <br>
                <input id='log-in-username' type='text' placeholder='Username'/>
                <br>

                <label for='log-in-password'> Password: </label>
                <br>
                <input id='log-in-password' type='password' placeholder='Password' />
                <br>

                <input type='checkbox' name='remember-me' id='remember-me' value='checked'>
                <label for='remember-me'>Remember Me?</label>
                <br>

                <button class='submit' id='submit-login'>Submit</button>

                <div class='notification' id='invalid-credentials'>
                    <p>Invalid username or password.<br>Please try again.</p>
                </div>

            </form>

        </div>
    </div>

</nav>`)
    $('main').append(nav);

}


function renderMobileAbout() {

    const mobileAbout = $(`
    <!-------------------------------------------------------------------------- Mobile About------------------------------------------------------------------------------>


        <aside id='mobile-about-div'>
            
            <h2 id='about-mobile'>About</h2>
            <p id='about-text-mobile'>It Takes A Village is a user and community-driven initiative to provide an accessible platform allowing users to find information regarding community resources and local initiatives. We encourage community groups, whether they be international NGO's, local non-profits, grassroots community organizations, or even local or delocalized groups of volunteers wanting to make an impact in their communities to sign-up. Once you are signed-up, you can create a post to describe your group or organization, your objectives, the projects and initiatives you are working on, the region you serve, and/or the resources you are providing or working to provide. Users interested in contacting an organization or group, or other organizations and groups seeking to collaborate, can also privately message one another through the application.</p>

        </aside>
        `);

    $('main').append(mobileAbout);

}


function renderAbout() {

    const about = $(`
    <!------------------------------------------------------------------------------ About ----------------------------------------------------------------------------------->


        <aside>

            <h2 id='about'>About</h2>
            <p id='about-text'>It Takes A Village is a user and community-driven initiative to provide an accessible platform allowing users to find information regarding community resources and local initiatives. We encourage community groups, whether they be international NGO's, local non-profits, grassroots community organizations, or even local or delocalized groups of volunteers wanting to make an impact in their communities to sign-up. Once you are signed-up, you can create a post to describe your group or organization, your objectives, the projects and initiatives you are working on, the region you serve, and/or the resources you are providing or working to provide. Users interested in contacting an organization or group, or other organizations and groups seeking to collaborate, can also privately message one another through the application.</p>

        </aside>
    `)
    $('main').append(about);

}


function renderPostsInterface() {

    const postsInterface = $(`
    <!-------------------------------------------------------------------------- Posts and Search -------------------------------------------------------------------------------->        


        <div id='posts-interface'>

            <div id='search-div'>

                <div id='search-box-div'>
                    <div>    
                        <form id='search-posts'>
                            <input id='post-search' type='search' name='post-search' placeholder='Search...'/>
                            <br>
                                <input type='checkbox' name='type-search' id='type-search'>
                                <label id='type-search-label' for='type-search'>Search While Typing?</label>
                        
                    </div>
                </div>

                    <div id='search-buttons-div'>
                        <button class='submit' id='submit-search'>Search</button>
                        <button id='clear-search' type='reset'>Clear</button>
                    </div>
                </form>
            </div>

            <section id='posts-area'>
            </section>

            <section id='messages-area'>
            </section>

            <div id='new-post-modal'>

                <h3 id='new-post-header'>New Post</h3>
                
                <form id='new-post-form'>

                    <label for='post-title'>Title</label>
                    <br>
                    <input type='text' name='post-title' id='post-title' placeholder="Title" minlength='3' maxlength='165' required>
                    <br>

                    <label for='post-description'>Description of Resource or Service</label>
                    <br>
                    <textarea name='post-description' id='post-description' placeholder="Description..." rows="7" required></textarea>
                    <br>

                    <label for='post-location'>Location or Area Served (Optional)<br>(Will default to "On Request" if not specified)</label>
                    <br>
                    <input type='text' name='post-location' id='post-location' placeholder='Location' minlength='2'>
                    <br>

                    <div id='delivery-price-div'>

                        <div id='post-delivery-div'>
                            <label for='post-delivery'>Do You Offer Delivery?</label>
                            <br>
                            <div id='post-delivery'>

                                <fieldset>
                                    <div>
                                        <label for='post-delivery-yes'>Yes</label>
                                        <br>
                                        <input type='radio' name='post-delivery' id='post-delivery-yes' value='true'>
                                    </div>

                                    <div>
                                        <label for='post-delivery-no'>No</label>
                                        <br>
                                        <input type='radio' name='post-delivery' id='post-delivery-no' value='false' checked>
                                    </div>
                                </fieldset>

                            </div>
                        </div>
                        
                        <div>
                            <label for='post-price'>Price</label>
                            <br>
                            <input type='number' id='post-price' name='post-price' placeholder='USD'>
                        </div>
                    </div>

                    <button id='submit-new-post'>Submit</button>
                    <button id='cancel-new-post'>Cancel</button>

                </form>

            </div>

            <div id='message-modal'>
                <h3>Send Message to Post Author</h3>
                <form>
                    <textarea id='message-text' rows='18' placeholder='Type message here...' required></textarea>
                    <br>
                    <button id='send-message'>Send</button>
                    <button id='cancel-message'>Cancel</button>
                </form>
            </div>

            <div id='delete-post-confirm'>
                <h3 id='new-post-header'>Confirm Delete</h3>
                <button id='confirm-delete'>Delete</button>
                <button id='cancel-delete'>Cancel</button>
            </div>

        </div>

    `)
    $('main').append(postsInterface);

}


//Creates posts and populates them in app
function buildAndRenderPost({title, location, description, author, willDeliver, price, isAuthor, active, _id}, loggedIn) {
    
    //If post is set to inactive (deleted), skip
    if (!active) {return}

    const {username} = author;
    const deliver = willDeliver ? 'Yes' : 'No';
    const located = location === '[On Request]' ? 'Location Available Upon Request' : location;

    //Display appropriate buttons based on login status and post-ownership
    let viewMessages = ''
    if(isAuthor && loggedIn) {viewMessages = `<button class='view-messages' id='post${_id}'>View Messages</button><button class='delete-post' id='${_id}'>Delete Post</button>`}
    else if (loggedIn) {viewMessages = `<button class='message-post-author' id='${_id}'>Message User</button>`}

    //If price is less than $100, format it as $XX.XX. If greater, format as $XXX. If API returns text for price, change text to $0.
    if (Boolean(+price)) {
        if (+price < 100){
            price = '$' + Number(price).toFixed(2);
        } else {
            price = '$' + Number(price);
        }
    } else {
        price = '$0'
    }

    //Template for posts
    const newPost = $(`
    <div class='post'>

        <div class='post-header'>

            <h3 class='post-title'>${title}</h3>
            <p class='post-location'>${located}</p>

        </div>

        <p class='post-text'>${description}</p>

        <div class='post-footer'>

            <p class='post-author'>By ${username}</p>
            <p class='post-delivery'>Delivery Available: ${deliver}</p>
            <p class='post-price'>Price: ${price}</p>

        </div>

        <div class='post-buttons'>

            
            ${viewMessages}

        </div>
    </div>
    `)

    $('#posts-area').prepend(newPost);
}


//Fetches all posts in API, and creates post item for each of them in app
async function renderPosts() {

    try{
        const loggedIn = await isLoggedIn();
        const postsArr = await fetchPosts();
        $('#posts-area').empty();
        postsArr.map( post => buildAndRenderPost(post, loggedIn));
        
    }
    catch(err) {
        console.error(`
            Uh oh! There's been an error building all posts.
            Error: ${err}
            `)
    }
}


function renderFooter() {

    const footer = $(`
    <!------------------------------------------------------------------------------------- Footer -------------------------------------------------------------------------------------->


    <footer>

        <p id='credits'>Created by: <a href='https://infallible-poitras-4a35ef.netlify.app/' target='_blank' title="Yahya Hafez's web portfolio">Yahya Hafez</a></p>
        <a id='linked-in-link' href='https://www.linkedin.com/in/yahya-hafez/' target='_blank' title="Yahya Hafez's Linkedin"><img id='linked-in' src='linkedin.png'/></a>

    </footer>

    `);
    $('#app').append(footer);

    //Display alternate hyperlink text if LinkedIn image fails to load
    $('#linked-in').on('error', () => {
        $('#linked-in').css('display', 'none');
        $('#linked-in-link').text('LinkedIn');
    })
}


async function renderApp(windowWidth) {

    $('#app').empty();
    $('#app').append($('<main>'));

    if(windowWidth > 800){
        renderLoadingScreen();
        renderHeader();
        renderAbout();
        renderPostsInterface();
        renderNav();
        renderFooter();
    }
    else {
        renderLoadingScreen();
        renderHeader();
        renderMobileAbout();
        renderNav();
        renderPostsInterface();
        renderFooter();
    }

    const posts = await renderPosts();

    if(await isLoggedIn()){
        
        const username = STATE.user['username'];
        const password = STATE.user['password'];
        login({username, password});
    }
        
}


//Saves token, username, password, and login time to localstorage after login
function setLocalStorage(token, username, password, name) {
    localStorage.setItem('token', token);
    localStorage.setItem('login-time', (new Date($.now()))/1000/60);
    localStorage.setItem('username', username);
    localStorage.setItem('password', password);
}


//Clears token, username, password, login time, and posts from localstorage on logout
function clearLocalStorage() {
    localStorage.setItem('token', '');
    localStorage.setItem('login-time', 0);
    localStorage.setItem('username', '')
    localStorage.setItem('password', '');
    localStorage.setItem('posts-array', '')
    localStorage.setItem('messages', '')
    localStorage.setItem('message-fetch-time', 0);
    localStorage.setItem('remember-me', '')
}


///Update nav and re-render posts upon successful login
async function login({username, password}) {
    STATE.user = {username, password};
    setLocalStorage(STATE.token, username, password);
    $('#nav-buttons').css('display', 'none');
    $('#sign-up').css('display', 'none');
    $('#log-in').css('display', 'none');
    $('#logged-in-nav').css('display', 'block');
    $('#post-search').val('');
    localStorage.setItem('post-fetch-time', 0);
    const render = await renderPosts();
    
    
    if($('#user-details').html() === '' && username != undefined) {$('#user-details').append($(`<h2 class='username'>${username}<h2>`))}
}


//Update nav and re-render posts upon logout
async function logout() {
    clearLocalStorage();
    $('#user-details').empty();
    $('#logged-in-nav').css('display', 'none');
    $('#nav-buttons').css('display', 'block');
    $('#successful-log-out').css('display', 'block');
    setTimeout(() => $('#successful-log-out').css('display', 'none'), 4000)
    $('#post-search').val('');
    localStorage.setItem('post-fetch-time', 0);
    const render = await renderPosts();
}


//Returns true and renews token if there is a token in local storage and last login was less than 30 minutes ago. Else, returns false.
async function isLoggedIn() {

    const token = localStorage.getItem('token');
    const timeSinceLogin = ((new Date($.now()))/1000/60) - Number(localStorage.getItem('login-time'));

    if(token && timeSinceLogin < 30) {
        
        try{
            onFetchStart();
            const response = await fetch(`${BASE_URL}/test/me`, {
                method: 'GET',
                headers: STATE['fetch-header']
            })

            const {success, error} = await response.json();
            onFetchEnd();
            if (success) {return true}
            else {return false}

        }
        catch (err) {
            console.error(`
            Uh oh! There's been an error checking if there's a user logged-in.
            Error: ${err}
            `)
            onFetchEnd();
        }
    }
    else {return false}
}


//Initializes application
async function bootstrap() {
    
    getWindowDimensions();
    const {width: intrnlWindowWidth} = STATE['window-size'];
    const render = await renderApp(intrnlWindowWidth);

    if(localStorage.getItem('remember-me')) {
        onFetchStart();
        STATE['token'] = localStorage.getItem('token');
        STATE['fetch-header']['Authorization'] = `Bearer ${STATE.token}`;
        const {username, password} = JSON.parse(localStorage.getItem('remember-me'));
        const localLogIn = await fetchLogIn(username, password);
        onFetchEnd();
    }

}

//Attempts to create newUser with API
async function registerNewUser(userObj) {

    try{
        onFetchStart();
        const response = await fetch(`${BASE_URL}/users/register`, {
            method: 'POST',
            headers: STATE['fetch-header'],
            body: JSON.stringify({user: userObj}),
        })

        const {success, data, error} = await response.json();

        // If registration is successful, clear form, save token in local storage, update nav and display, re-render posts, and show "successful sign-up" message to user
        if (success) {
            
            localStorage.setItem(`${userObj.user}`, JSON.stringify(userObj));
            $('#sign-up-form').trigger('reset');

            STATE.token = data.token;
            STATE['fetch-header']['Authorization'] = `Bearer ${STATE.token}`
            
            login(userObj);

            $('#successful-sign-up').css('display', 'block');
            setTimeout(() => {
                $('#successful-sign-up').css('display', 'none')
            }, 4000);

        } 
        //If username is taken, display prompt notifying user
        else if(error.name === 'UserExists') {
            $('#username-taken').css('display', 'block');
            setTimeout(() => {
                $('#username-taken').css('display', 'none')
            }, 4000);
        }
        onFetchEnd();
        return data;
    }
    catch(err) {
        console.error(`
        Uh oh! There's been an error registering a new user with the API.
        Error: ${err}
        `)
        onFetchEnd();
    }

}


//Checks if login is current and recent and, if not, renews login token
async function renewToken() {
    if(!isLoggedIn()){
        const password = localStorage.getItem('password');
        const username = localStorage.getItem('username');
        fetchLogIn(username, password);
    }
}


//Attempts to validate user login with API.
async function fetchLogIn(username, password) {

    const user = {username, password}

    try{
        onFetchStart();
        const response = await fetch(`${BASE_URL}/users/login`, {
            method: 'POST',
            headers: STATE['fetch-header'],
            body: JSON.stringify({
                user
            }),
        })
        const {success, data, error} = await response.json();
        onFetchEnd();

        //If successful, save returned token to state and local storage, update nav, re-render posts, and display "successful login" message to user
        if (success) {
            STATE.token = data.token;
            STATE['fetch-header']['Authorization'] = `Bearer ${STATE.token}`

            login(user);
            $('#successful-log-in').css('display', 'block');
                setTimeout(() => {
                    $('#successful-log-in').css('display', 'none')
                }, 4000);

            //Enables "Remember Me?" checkbox functionality
            if(!($('#remember-me').is(':checked'))) {
                $('#log-in-form').trigger('reset');
            }
            else {
                localStorage.setItem('remember-me', JSON.stringify({username, password}))
            }
        }

        //If unsuccessful, but not an error with the API, display "Invalid credentials" message to user
        else if (error.name === 'InvalidCredentials') {
            $('#invalid-credentials').css('display', 'block');
            setTimeout(() => {
                $('#invalid-credentials').css('display', 'none')
            }, 4000);
        }
    }
    catch(err) {
        console.error(`
        Uh oh! There's been an error fetching the log-in information with the API
        Error: ${err}
        `)
        onFetchEnd();
    }

}


//Fetches all posts from API
async function fetchPosts () {

    //Check if there are posts cached in local storage from less than 30 minutes ago. If so, store cached posts in STATE and return.
    const currTimeInMin = ((new Date($.now())).getTime())/1000/60;

    if (localStorage.getItem('posts-array')
    && (currTimeInMin - +localStorage.getItem('post-fetch-time')) < 30) {

        STATE['posts-array'] = JSON.parse(localStorage.getItem('posts-array'));
        const postsArr = STATE['posts-array'];
        return postsArr;

    }
    //If no recent cache available, initiate a new fetch call for posts, update STATE and local storage with newly fetched posts, and return.
    else {
        try {
            onFetchStart();
            const response = await fetch(`${BASE_URL}/posts`, {
                method: 'GET',
                headers: STATE['fetch-header']
            });
            const {data: postsObj} = await response.json();
            const {posts: postsArr} = postsObj;

            STATE['posts-array'] = postsArr;
            localStorage.setItem('posts-array', JSON.stringify(postsArr));
            
            //Store time of fetch call in minutes into local storage.
            const fetchTimeInMin = ((new Date($.now())).getTime())/1000/60;
            localStorage.setItem('post-fetch-time', `${fetchTimeInMin}`);

            onFetchEnd();
            return postsArr;

        }
        catch(err) {
            console.error(`
            Uh oh! There's been an error fetching posts.
            Error: ${err}
            `)
            onFetchEnd();
        }
    }

}


//Attempts to create a new post in the API
async function createNewPost(title, description, location, price, willDeliver) {

    renewToken();

    try {
        onFetchStart();
        const response = await fetch(`${BASE_URL}/posts`, {
            method: 'POST',
            headers: STATE['fetch-header'],
            body: JSON.stringify({
                post: {
                    title,
                    description,
                    price,
                    location,
                    willDeliver,
                }
            })
        });
        const {data} = await response.json();
        const {post: postObj} = await data;
        onFetchEnd();
        return(postObj);
    }
    catch(err) {
        console.error(`
        Uh oh! There's been an error creating a new post.
        Error: ${err}
        `)
        onFetchEnd();
    }
    
}


//Attempts to delete post. Returns true if successful, and false if unsuccessful
async function deletePost(postID) {

    renewToken();

    try {
        onFetchStart();
        const response = await fetch(`${BASE_URL}/posts/${postID}`, {
            method: 'DELETE',
            headers: STATE['fetch-header']
        });
        const {success} = await response.json();
        onFetchEnd();

        //Re-render posts if successful
        if(success) {
            localStorage.setItem('post-fetch-time', 0);
            const render = await renderPosts();
            return true;
        } else {return false}

    }
    catch(err) {
        console.error(`
        Uh oh! There's been an error deleting a post.
        Error: ${err}
        `);
        onFetchEnd();
        return false;
    }
}


//Attempts to send message to post author. Returns true if successful, and false if unsuccessful.
async function sendMessage(postID, message) {
    
    renewToken();

    try {
        onFetchStart();
        const response = await fetch(`${BASE_URL}/posts/${postID}/messages`, {
            method: 'POST',
            headers: STATE['fetch-header'],
            body: JSON.stringify({
                message: {
                    content: message
                }
            })
        });

        const {success} = await response.json();
        onFetchEnd();

        if(success) {return true}
        else {return false}
    }
    catch(err) {
        console.error(`
        Uh oh! There's been an error sending a message.
        Error: ${err}
        `);
        onFetchEnd();
        return false;
    }
}


//Attempts to retrieve messages and posts of logged-in user. If there are cached messages and they're recent, uses those instead.
async function getMessages() {
    
    renewToken();
    let localCache = localStorage.getItem('messages');
    const msgFetchTime = localStorage.getItem('message-fetch-time');

    if(localCache && (new Date($.now()))/1000/60 - msgFetchTime < 30){
        const messages = JSON.parse(localStorage.getItem('messages'));
        STATE['messages-aray'] = messages;
        $('#messages-area').empty();
        messages.map((messageArr) => buildMessage(messageArr));
    }
    else{
        try {
            onFetchStart();
            const response = await fetch(`${BASE_URL}/users/me`, {
                headers: STATE['fetch-header'],
            });

            const {messages} = await response.json();
            STATE['messages-aray'] = messages;
            localStorage.setItem('messages', JSON.stringify(messages));
            localStorage.setItem('message-fetch-time', JSON.stringify((new Date($.now()))/1000/60))

            $('#messages-area').empty();
            messages.map((messageArr) => buildMessage(messageArr));
            onFetchEnd();
        }
        catch(err) {
            console.error(`
            Uh oh! There's been an error getting user messages.
            Error: ${err}
            `);
            onFetchEnd();
        }
    }
}


//Creates message and populates it in hidden modals
function buildMessage({content,post,fromUser, _id}) {

    const {_id: postID} = post;
    const {username} = fromUser;

    const newMessage = $(`
    <div class='user-message-div for${postID}' id='${_id}'>
    
        <h3 class='message-title'>Message from ${username}</h3>
        
        <div class='user-message'>
            <p class='user-message-text'>${content}</p>
        </div>

        <button class='close-user-messages'>Close</button>
    </div>
    `)

    $('#messages-area').append(newMessage);

}


//Turns on loading animation and background blur
function onFetchStart() {$('#loading-div').css('display', 'flex')}


//Turns off loading animation and background blur
function onFetchEnd() {$('#loading-div').css('display', 'none')}


/*----------------------------------------------------------------------------------- Event Handlers --------------------------------------------------------------------------------*/


//Enables "About" information to drop down on click and hide up when clicked if open

$('#app').on('click', '#about', () => {
    if ($('#about-text').css('display') === 'none') {
        
        $('#about').addClass('animated fadeOut');
        setTimeout(() => {
            $('aside').css('justify-content', 'start')
            $('#about').removeClass('fadeOut');
            $('#about').addClass('fadeIn slow');
            $('#about-text').addClass('animated slideInUp');
            $('#about-text').css('display', 'initial');
        }, 1000)
        setTimeout(() => {
            $('#about').removeClass('animated fadeIn slow');
            $('#about-text').removeClass('animated slideInUp')
        }, 3000)

    }
    else {

        $('#about').addClass('animated fadeOut');
        $('#about-text').addClass('animated fadeOut');
        setTimeout(() => {
            $('aside').css('justify-content', 'center')
            $('#about').removeClass('fadeOut');
            $('#about').addClass('fadeIn slower');
            $('#about-text').css('display', 'none');
            $('#about-text').removeClass('animated fadeOut')
        }, 1000)
        setTimeout(() => {
            $('#about').removeClass('animated fadeIn slower');
        }, 2500)
    
    }
})


//Enables "About" information to drop down on click and hide up when clicked if open on mobile
$('#app').on('click', '#about-mobile', () => {
    if ($('#about-text-mobile').css('display') === 'none') {

        $('#mobile-about-div').css('overflow', 'scroll');
        $('#about-mobile').addClass('animated fadeOutRight fast')
        $('#about-text-mobile').css('display', 'initial');
        $('#about-text-mobile').addClass('animated fadeIn slower');

        setTimeout(() => {
            $('#about-mobile').removeClass('fadeOutRight');
            $('#about-mobile').addClass('fadeInLeft fast');
        }, 600)
        setTimeout(() => {
            $('#about-mobile').removeClass('animated fadeInLeft fast');
            $('#about-text-mobile').removeClass('animated fadeIn slower');
        }, 1500)
    }
    else {
        $('#mobile-about-div').css('overflow', 'hidden');
        $('#about-mobile').addClass('animated fadeOutLeft fast')
        $('#about-text-mobile').addClass('animated fadeOut fast');

        setTimeout(() => {
            $('#about-text-mobile').css('display', 'none');
            $('#about-mobile').removeClass('fadeOutLeft');
            $('#about-mobile').addClass('fadeInRight');
        }, 600)
        setTimeout(() => {
            $('#mobile-nav').removeClass('animated fadeInRight');
            $('#about-text-mobile').removeClass('animated fadeOut fast');
        }, 1500)
    }
})


//Enables "Sign Up" button, opening and closing sign up form
$('#app').on('click', '#sign-up-button', () => {
    if ($('#sign-up').css('display') === 'none') {$('#sign-up').css('display', 'block')}
    else {$('#sign-up').css('display', 'none')}
    if ($('#log-in').css('display') != 'none') {$('#log-in').css('display', 'none')}
})


//Enables "Log In" button, opening and closing sign in form
$('#app').on('click', '#log-in-button', () => {

    if ($('#log-in').css('display') === 'none') {
        $('#log-in').css('display', 'initial');

        //Check if local user previously logged in with "Remember Me?" checked. If so, auto-full username and password fields
        let rememberedUser = localStorage.getItem('remember-me');
        if(rememberedUser){
            rememberedUser = JSON.parse(rememberedUser);
            $('#log-in-username').val(rememberedUser.username);
            $('#log-in-password').val(rememberedUser.password);
        }
    }
    else {$('#log-in').css('display', 'none')}

    if ($('#sign-up').css('display') != 'none') {$('#sign-up').css('display', 'none')}

})


//Upon clicking "submit" on sing-up form, validate sign-up form fields, creates new user, stores sign-up information and toekn in local storage, display success message or relevant error messages
$('#app').on('click', '#submit-signup', async (event) => {
    
    const firstName = $('#sign-up-first-name').val();
    const lastName = $('#sign-up-last-name').val();
    const email = $('#sign-up-email').val();
    const username = $('#sign-up-username').val();
    const password = $('#sign-up-password').val();
    const confPassword = $('#sign-up-confirm-password').val();

    //Don't prevent default unless submission event meets necessary criteria so that html input validation works properly
    if (firstName.length >= 2 && firstName.length <= 20
        && lastName.length >= 2 && lastName.length <= 20
        && email.length >= 8 && email.length <= 35
        && username.length >= 5 && username.length <= 20
        && password.length >= 8 && password.length <= 20
        && confPassword.length >= 8 && confPassword.length <= 20)
    {
            
        event.preventDefault();

        //Check if 'password' and 'confirm password' fields match before creating user object. If not, notify user.
        if (password != confPassword) {
            $('#password-mismatch').css('display', 'block');
            setTimeout(() => {$('#password-mismatch').css('display', 'none')}, 4000);
        }
        else {

            //Create new user in server with POST call.
            try {

                const userObj = {
                    'first-name': firstName,
                    'last-name': lastName,
                    email,
                    user: {
                            username,
                            password,
                    }
                }

                const {username: newUser} = userObj.user;
                const registration = await registerNewUser(userObj.user);
                return registration;
            }
            catch(err) {
                console.error(`
                Uh oh! There's been an error submitting the sign-up form.
                Error: ${err}
                `)
            }
        }
    }
})


//Upon clicking "submit" on log-in form, fetch login, update nav, and display success message or error message
$('#app').on('click', '#submit-login', async (event) => {

    event.preventDefault();
    const username = $('#log-in-username').val();
    const password = $('#log-in-password').val();

    try {const response = await fetchLogIn(username, password)}
    catch (err) {
        console.error(`
                Uh oh! There's been an error logging-in.
                Error: ${err}
                `)
    }
})


//Upon clicking "log-out" button, clear token in local storage and nav
$('#app').on('click', '#log-out-button', () => {logout()})


//Enable "New Post" button
$('#app').on('click', '#new-post-button', () => {$('#new-post-modal').css('display', 'block')})


//Enables "Submit" button on "Create New Post" form
$('#app').on('click', '#submit-new-post', async (event) => {

    if ($('#post-title').val() != '' && $('#post-title').length >= 3 && $('#post-description').val() != '') {
        event.preventDefault()
        const title = $('#post-title').val();
        const description = $('#post-description').val();
        const location = $('#post-location').val() != '' ? $('#post-location').val() : 'Location Available Upon Request';
        const price = $('#post-price').val() != '' ? $('#post-price').val() : 0;
        const delivery = Boolean($('input[name="post-delivery"]:checked').val());

        $('#new-post-modal').css('display', 'none');
        const newPost = await createNewPost(title, description, location, price, delivery);
        localStorage.setItem('post-fetch-time', 0);
        const render = await renderPosts();
        $('#new-post-form').trigger('reset');
    }

})


//Enable "Cancel" button on "Create New Post" form
$('#app').on('click', '#cancel-new-post', () => {
    event.preventDefault();
    $('#new-post-form').trigger('reset');
    $('#new-post-modal').css('display', 'none');
    
})


//Closes "Create New Post", "Send Message", "Read Message", and ""Confirm Delete" modalS when "Esc" is clicked
$('#app').on('keydown', (event) => {
    
    //Checks to see if there's any "Read Message" modals open
    let allMessages = $('.user-message-div');
    for (let i = 0; i < allMessages.length; ++i){
        if ($(allMessages[i]).css('display') === 'block'){
            allMessages = true;
            break;
        }
    }
    if (typeof allMessages === 'object') {allMessages = false} 


    if(event.which === 27 && $('#new-post-modal').css('display') === 'block') {
        $('#new-post-modal').css('display', 'none');
        event.preventDefault();
    }
    else if(event.which === 27 && $('#message-modal').css('display') === 'block') {
        $('#message-text').val('');
        $('#message-modal').css('display', 'none');
        STATE['send-message-post-id'] = '';
    }
    else if(event.which === 27 && allMessages) {
        let openMessages = [...STATE['open-messages']];
        const currentMessage = openMessages[openMessages.length - 1];
        $(currentMessage).css('display', 'none');
        openMessages.pop();
        STATE['open-messages'] = openMessages;

        if(openMessages.length === 0) {STATE['view-message-post-id'] = ''}

    }
    else if(event.which === 27 && $('#delete-post-confirm').css('display') === 'block') {
        $('#delete-post-confirm').css('display', 'none');
        STATE['delete-post-id'] = '';
    }
})


//Enables post "search" button
$('#app').on('click', '#submit-search', (event) => {

    event.preventDefault();

    $('.post').css('display', 'none');
    let search = $('#post-search').val()
    let arr = [...search]
    
    //Below are some workarounds to make make ':contains' case-insensitive
    $(`.post:contains(${search})`).css('display', 'block');
    $(`.post:contains(${search.toUpperCase()})`).css('display', 'block');
    $(`.post:contains(${search.toLowerCase()})`).css('display', 'block');

    search = `${search.charAt(0).toUpperCase() + search.substring(1)}`
    $(`.post:contains(${search})`).css('display', 'block');

    for (let i = 0; i < search.length; ++i) {
        if (search[i] === ' ') {
            const capitalizedSearch = search.substring(0, i + 1) + search.charAt(i + 1).toUpperCase() + search.substring(i + 2);
            $(`.post:contains(${capitalizedSearch})`).css('display', 'block');
        }
    }
})


// Allows users to filter displayed posts by search terms as they're typing
$('#app').on('keyup', '#post-search', (event) => {

    if ($('#type-search').is(':checked')) {

        $('.post').css('display', 'none');
        let search = $('#post-search').val()
        STATE['search'] = search;
        let arr = [...search]
        
        //Below are some workarounds to make make ':contains' case-insensitive
        $(`.post:contains(${search})`).css('display', 'block');
        $(`.post:contains(${search.toUpperCase()})`).css('display', 'block');
        $(`.post:contains(${search.toLowerCase()})`).css('display', 'block');

        search = `${search.charAt(0).toUpperCase() + search.substring(1)}`
        $(`.post:contains(${search})`).css('display', 'block');

        for (let i = 0; i < search.length; ++i) {
            if (search[i] === ' ') {
                const capitalizedSearch = search.substring(0, i + 1) + search.charAt(i + 1).toUpperCase() + search.substring(i + 2);
                $(`.post:contains(${capitalizedSearch})`).css('display', 'block');
            }
        }
    }
})


//Enables "Clear" button for post-search
$('#app').on('click', '#clear-search', () => {
    $('.post').css('display', 'block');
    $('#post-search').val('');
})


//Enables "Delete Post" button on posts and saves postID to state
$('#app').on('click', '.delete-post', (event) => {
    const postID = $(event.target).attr('id');
    STATE['delete-post-id'] = postID;
    $('#delete-post-confirm').css('display', 'block');
})


//Enables "Cancel Delete" button on "Confirm Delete" modal
$('#app').on('click', '#cancel-delete', () => {
    $('#delete-post-confirm').css('display', 'none');
    STATE['delete-post-id'] = '';
})


//Enables "Confirm Delete" button on "Confirm Delete" modal
$('#app').on('click', '#confirm-delete', async (event) => {
    
    try{
        const postID = STATE['delete-post-id'];
        deletePost(postID);
        $('#delete-post-confirm').css('display', 'none');
    }
    catch(err) {
        console.error(`
        Uh oh! There's been an error with the confirm delete click handler.
        Error: ${err}
        `);
    }

})


//Enables "Send" button on "Send Message" form
$('#app').on('click', '#send-message', () => {
    const postID = STATE['send-message-post-id'];
    const message = $('#message-text').val();
    if (message != ''){
        sendMessage(postID, message);
        $('#message-text').val('');
        $('#message-modal').css('display', 'none');
    }
})

//Enables "Cancel" button on "Send Message" form
$('#app').on('click', '#cancel-message', () => {
    $('#message-text').val('');
    $('#message-modal').css('display', 'none');
    STATE['send-message-post-id'] = '';
})


//Enables "Message User" button on posts
$('#app').on('click', '.message-post-author', (event) => {
    const postID = $(event.target).attr('id');
    STATE['send-message-post-id'] = postID;
    $('#message-modal').css('display', 'block');
})


//Enables "View Messages" button on posts
$('#app').on('click', '.view-messages', async (event) => {
    const response = await getMessages();

    const postID = 'for' + $(event.target).attr('id').substring(4);
    STATE['view-message-post-id'] = postID;

    const messageArr = $(`.${postID}`);
    STATE['open-messages'] = messageArr;
    
    $(`.${postID}`).css('display', 'block');
})


//Enables "Close" button on message modal
$('#app').on('click', '.close-user-messages', (event) => {
    const modal = $(event.target).closest('.user-message-div');

    let openMessages = [...STATE['open-messages']];
    openMessages.pop();
    STATE['open-messages'] = openMessages

    if(openMessages.length === 0) {STATE['view-message-post-id'] = ''}

    modal.css('display', 'none');
})


$('#app').on('click', '.hide', () =>{
    
    if ($('.hide').text() === 'Hide') {
        $('.hide').text('Show Nav');
        $('#all-nav').css('display', 'none');
    }
    else if ($('.hide').text() === 'Show Nav') {
        $('.hide').text('Hide')
        $('#all-nav').css('display', 'block');
    }

})
//Store window dimensions and re-render app on widow-resize
$(window).on('resize', () => {
    
    let token = ''
    if(isLoggedIn()) {
        token = localStorage.getItem('token');
        STATE['token'] = token;
        STATE['fetch-header']['Authorization'] = `Bearer ${token}`;
    }
    
    getWindowDimensions();
    const {width: windowWidth} = STATE['window-size'];
    renderApp(windowWidth);
})


// Collapses mobile nav and about when scrolled past
$(window).on('scroll', () => {
    // console.log($(window).scrollTop())
    const aboutHeightFromTop = $('#mobile-about-div').offset().top + $('#mobile-about-div').outerHeight();
    const navHeightFromTop = $('nav').offset().top + $('nav').outerHeight();
    
    if($(window).scrollTop() > aboutHeightFromTop) {
        $('#mobile-about-div').removeClass('animated fadeInUp');
        $('#mobile-about-div').addClass('animated fadeOutUp');
        $('#mobile-about-div').css('display', 'none');
    }
    if($(window).scrollTop() < aboutHeightFromTop && $('#mobile-about-div').hasClass('fadeOutUp')) {
        console.log('here')
        $('#mobile-about-div').removeClass('fadeOutUp animated');
        $('#mobile-about-div').css('display', 'initial');
        $('#mobile-about-div').addClass('animated fadeInUp');
    }
})


/*----------------------------------------------------------------------------------- Run-Time --------------------------------------------------------------------------------*/

$(document).ready(bootstrap);

