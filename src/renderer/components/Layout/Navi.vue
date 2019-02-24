<template>
    <nav class='navbar is-white'>
        <div class='container'>
            <div class='navbar-brand'>
                <router-link class='navbar-item brand-text' to='/'>
                    <b-icon icon='shield-half-full'></b-icon>
                </router-link>
                <div class='navbar-burger burger' data-target='navMenu'>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
            <div id='navMenu' class='navbar-menu'>
                <div class='navbar-start'>
                    <router-link class='navbar-item' to='/demos'>Demos</router-link>
                    <router-link class='navbar-item' to='/friends'>Friends</router-link>
                    <router-link class='navbar-item' to='/settings'>Settings</router-link>
                    <router-link class='navbar-item' to='/system-information'>System
                    </router-link>
                </div>
            </div>
        </div>
    </nav>
</template>