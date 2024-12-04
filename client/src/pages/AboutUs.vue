<script setup lang="ts">
    import NavBar from '../components/NavBar.vue';
    import BackgroundImage from '../components/BackgroundImage.vue';
    import Footer from '../components/Footer.vue'

</script>

<template>
    <NavBar :current-page="'about'"></NavBar>
    <BackgroundImage :background-image-name="'two-people-running-with-sports.jpeg'"></BackgroundImage>
    <div class="is-flex is-flex-direction-column is-align-items-center mt-6">
        <h1 class="title set-text-color-white">About Us</h1>

        <div class="is-flex add-row-gap is-size-5 image is-256x256">
            <figure class="is-flex is-flex-direction-column">
                <img class="is-rounded red-shadow" src="../assets/professional-firefighter.jpg" alt="AI generated image of a firefighter in uniform"/>
                <p class="set-text-color-white center-text mt-2">Henry Jeffrey, <b>CEO</b></p>
            </figure>
            <figure class="is-flex is-flex-direction-column">
                <img class="is-rounded red-shadow" src="../assets/professional-man.jpg" alt="AI generated image of a man in business attire"/>
                <p class="set-text-color-white center-text mt-2">Johnathon Jain, <b>CTO</b></p>
            </figure>
            <figure class="is-flex is-flex-direction-column">
                <img class="is-rounded red-shadow" src="../assets/professional-woman.jpg" alt="AI generated image of a woman in business attire"/>
                <p class="set-text-color-white center-text mt-2">Gale Jain, <b>CFO</b></p>
            </figure>
        </div>

        <p class="set-text-color-white is-size-5 width-50-percent">
            Lorem ipsum odor amet, consectetuer adipiscing elit. Fames euismod dolor, eleifend class vel montes mi quisque. Augue at dignissim ultricies ex augue. Suscipit senectus habitant, ut himenaeos torquent nam. Lectus suscipit diam pulvinar rutrum ultricies pretium imperdiet. Praesent faucibus quisque netus neque tempor natoque consectetur hac. Auctor nam taciti duis praesent sit eu lorem luctus. Vulputate laoreet et habitasse parturient ultricies quis eu purus.
            <br><br>
            Class habitasse vivamus sed cras sociosqu. Feugiat per at imperdiet platea urna vitae. Sollicitudin quam felis malesuada porttitor conubia dapibus est fermentum. Ac gravida dictum ultrices condimentum curabitur sapien vitae facilisis sociosqu. Libero quisque facilisis pharetra elementum nisl auctor fringilla. Class iaculis cras sit dis ridiculus nulla penatibus. Donec consequat vulputate platea platea magnis vitae per efficitur. Litora venenatis ipsum fringilla potenti egestas justo.
        </p>
    </div>
    <Footer />
</template>

<style scoped>
    .red-shadow {
        box-shadow: 0.5rem 0.5rem 1rem #ec3642;
    }

    .center-text {
        text-align: center;
    }

    .add-row-gap {
        gap: 1rem;
    }

    .set-text-color-white {
        color: white;
    }

    .width-50-percent {
        width: 60%;
    }
</style>