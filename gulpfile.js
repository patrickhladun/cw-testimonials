require('dotenv').config();
const gulp = require('gulp');
const browserSync = require( 'browser-sync' );
const zip = require('gulp-zip');
const del = require( 'del' );
const rename = require( 'gulp-rename' );
const using = require( 'gulp-using' );
const argv = require( 'yargs' ).argv;
const yf = require( 'gulp-if' );
const changed = require( 'gulp-changed' );
const concat = require( 'gulp-concat' );
const autoprefixer = require( 'gulp-autoprefixer' );
const sourcemaps = require( 'gulp-sourcemaps' );
const sass = require('gulp-sass')(require('sass'));
const merge = require('merge-stream');

const reload = browserSync.reload;

const json = require('./package.json');

const name = json.name;
const version = json.version;
const path  = process.env.BUNDLE_PATH;

const prod = argv.prod !== undefined;
const dev = argv.prod === undefined;

gulp.task( 'copy', () => {
    return gulp.src([
        '**/*',
        '!.git',
        '!node_modules/**',
        '!src/**',
        '!bundled/**',
        '!eslintrc.js',
        '!gulpfile.js',
        '!package.json',
        '!package-lock.json',
        '!webpack.config.js',
        '!webpack.development.js',
        '!webpack.production.js',
        '!yarn.lock',
        '!yarn-error.log',
        '!.gitignore',
    ])
        .pipe(gulp.dest(`./${name}`))
});

gulp.task( 'zip', () => {
    return gulp.src([`./${name}/**`], {base: './'})
        .pipe(zip(`${name}.zip`))
        .pipe(gulp.dest('./'))
});

gulp.task('export', function () {
    return gulp.src(`${name}.zip`)
        .pipe(rename(`${name}-${version}.zip`))
        .pipe( gulp.dest( path ) );
});

gulp.task( 'clean', () => {
    return del([`./${name}`,`./${name}.zip`]);
} );

gulp.task( 'bundle', gulp.series(
    'copy',
    'zip',
    'export',
    'clean'
) );

const options = {
    browserSync: {
        proxy: process.env.LOCAL_SITE_URL,
        open: false,
        notify: false,
        files: [
            '/dist/style.css',
            '/assets/css/**/*.css'
        ]
    }
};

const styles = [
    {
        src: 'src/styles/default/*.scss',
        sass: 'src/styles/default/block-default.scss',
        dest: 'assets/css/',
        clean: 'assets/block-default.css'
    },
    {
        src: 'src/styles/border/*.scss',
        sass: 'src/styles/border/block-border.scss',
        dest: 'assets/css/',
        clean: 'assets/block-border.css'
    },
    {
        src: 'src/styles/simple/*.scss',
        sass: 'src/styles/simple/block-simple.scss',
        dest: 'assets/css/',
        clean: 'assets/block-simple.css'
    }
];

gulp.task( 'build:styles', () => {

    const tasks = styles.map( (style) => {
        return gulp
            .src( style.sass )
            .pipe( using( { prefix: 'File:' } ) )
            .pipe( yf( dev, sourcemaps.init() ) )
            .pipe( yf( dev, sass( options.sass ), sass() ) )
            .pipe( autoprefixer( options.autoprefixer ) )
            .pipe( changed( style.dest ) )
            .pipe( yf( dev, sourcemaps.write( '.' ) ) )
            .pipe( gulp.dest( style.dest ) )
            .pipe( browserSync.reload( { stream: true } ) );
    });

    return merge(tasks)

} );

gulp.task( 'change', () => {
    gulp.watch( './**/*.php' ).on( 'change', reload );
    gulp.watch( 'dist/*.js' ).on( 'change', reload );
    gulp.watch( 'src/styles/**/*.scss', gulp.series( 'build:styles' ) );
} );

gulp.task( 'browserSync', () => {
    browserSync.init( options.browserSync );
} );

gulp.task( 'watch', gulp.parallel(
        'change',
        'browserSync'
    )
);
