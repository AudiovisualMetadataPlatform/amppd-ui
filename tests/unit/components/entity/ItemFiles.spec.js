import { shallowMount, createLocalVue } from "@vue/test-utils";
import {createBootstrap} from "bootstrap-vue-next";
import ItemFiles from "../../../../src/components/entity/ItemFiles.vue";

jest.mock("../../../../src/service/base-service", function () {
    return jest.fn().mockImplementation(function () {
        const superFn = {
            get_auth: () => {
                return true;
            },
            post_auth: () => {
                return true;
            },
        };
        return superFn;
    });
});
jest.mock("../../../../src/service/shared-service", function () {
    return jest.fn().mockImplementation(function () {
        const superFn = {
            sortByAlphabatical: (arr) => {
                console.log(arr);
                return arr;
            },
        };
        return superFn;
    });
});
jest.mock("../../../../src/service/primary-file-service", () => {
    return jest.fn().mockImplementation(function () {
        const superFn = {
            getPrimaryFiles: (id) => {
                return Promise.resolve({
                    data: {
                        _embedded: {
                            primaryfiles: [
                                {
                                    id: 15431,
                                    name: "TestAudio.mp3",
                                    description: "Test",
                                    createdDate: "2022-02-09T13:58:22.603+0000",
                                    modifiedDate: "2022-02-09T13:58:22.731+0000",
                                    createdBy: "samani@iu.edu",
                                    modifiedBy: "samani@iu.edu",
                                    originalFilename: "TestAudio.mp3",
                                    pathname: "U-33/C-3708/I-15366/P-15431.mp3",
                                    datasetId: null,
                                    symlink: null,
                                    mediaInfo:
                                        '{"tags": {}, "streams": {"audio": [{"@type": "audio", "codec": "mp3", "bit_rate": 108955, "channels": 2, "duration": 2.063673, "@position": 0, "user_data": {"encoder": "LAME3.98r"}, "sample_rate": 44100, "sample_format": "fltp", "channel_layout": "stereo"}]}, "container": {"name": "P-15431.mp3", "size": 28502, "tags": {"album": "SoundBible.com Sounds and Soun", "genre": "Other", "title": " Sounds and Sound Effects", "artist": "SoundBible.com"}, "time": 1644415102.6108832, "type": "file", "format": "mp3", "duration": 2.063673, "mime_type": "audio/mpeg"}}',
                                    mediaFile: null,
                                    historyId: null,
                                    _links: {
                                        self: {
                                            href:
                                                "http://amp-test.dlib.indiana.edu/rest/primaryfiles/15431",
                                        },
                                        primaryfile: {
                                            href:
                                                "http://amp-test.dlib.indiana.edu/rest/primaryfiles/15431{?projection}",
                                            templated: true,
                                        },
                                        supplements: {
                                            href:
                                                "http://amp-test.dlib.indiana.edu/rest/primaryfiles/15431/supplements{?projection}",
                                            templated: true,
                                        },
                                        item: {
                                            href:
                                                "http://amp-test.dlib.indiana.edu/rest/primaryfiles/15431/item{?projection}",
                                            templated: true,
                                        },
                                        bundles: {
                                            href:
                                                "http://amp-test.dlib.indiana.edu/rest/primaryfiles/15431/bundles{?projection}",
                                            templated: true,
                                        },
                                    },
                                },
                                {
                                    id: 15433,
                                    name: "TEST",
                                    description: "desc",
                                    createdDate: "2022-02-09T14:12:32.037+0000",
                                    modifiedDate: "2022-02-09T14:12:32.183+0000",
                                    createdBy: "samani@iu.edu",
                                    modifiedBy: "samani@iu.edu",
                                    originalFilename: "TestVideo.mp4",
                                    pathname: "U-33/C-3708/I-15366/P-15433.mp4",
                                    datasetId: null,
                                    symlink: null,
                                    mediaInfo:
                                        '{"tags": {}, "streams": {"audio": [{"@type": "audio", "codec": "aac", "bit_rate": 69280, "channels": 1, "duration": 70.0, "@position": 1, "user_data": {"language": "eng", "handler_name": "SoundHandler"}, "sample_rate": 24000, "sample_format": "fltp", "channel_layout": "mono"}], "video": [{"@type": "video", "codec": "h264", "bit_rate": 66265, "duration": 70.0, "@position": 0, "user_data": {"language": "und", "handler_name": "VideoHandler"}, "dimensions": {"width": 320, "height": 240, "sample_aspect_ratio": [1, 1], "display_aspect_ratio": [4, 3]}, "frame_rate": 12.0, "pixel_format": "yuv420p", "codec_profile": "High", "bits_per_sample": 8}]}, "container": {"name": "P-15433.mp4", "size": 1212097, "tags": {"encoder": "Lavf57.83.100", "major_brand": "isom", "minor_version": "512", "compatible_brands": "isomiso2avc1mp41"}, "time": 1644415952.046648, "type": "file", "format": "mov,mp4,m4a,3gp,3g2,mj2", "duration": 70.043, "mime_type": "video/mp4"}}',
                                    mediaFile: null,
                                    historyId: null,
                                    _links: {
                                        self: {
                                            href:
                                                "http://amp-test.dlib.indiana.edu/rest/primaryfiles/15433",
                                        },
                                        primaryfile: {
                                            href:
                                                "http://amp-test.dlib.indiana.edu/rest/primaryfiles/15433{?projection}",
                                            templated: true,
                                        },
                                        supplements: {
                                            href:
                                                "http://amp-test.dlib.indiana.edu/rest/primaryfiles/15433/supplements{?projection}",
                                            templated: true,
                                        },
                                        item: {
                                            href:
                                                "http://amp-test.dlib.indiana.edu/rest/primaryfiles/15433/item{?projection}",
                                            templated: true,
                                        },
                                        bundles: {
                                            href:
                                                "http://amp-test.dlib.indiana.edu/rest/primaryfiles/15433/bundles{?projection}",
                                            templated: true,
                                        },
                                    },
                                },
                            ],
                        },
                    },
                });
            },
        };
        return superFn;
    });
});

describe("ItemFiles.vue", () => {
    let wrapper;
    let refreshDataSpy;
    const localVue = createLocalVue();
    localVue.use(createBootstrap());
    const $store = {
        state: {
            primaryFiles: {
                page: {
                    number: 1,
                    size: 20,
                    totalElements: 0,
                },
                _embedded: {
                    primaryfiles: [],
                },
            },
            selectedItem: {},
            accessControl: {
                _item: {
                    _update: false,
                },
            },
        },
    };
    beforeEach(() => {
        wrapper = shallowMount(ItemFiles, {
            localVue,
            mocks: {
                $store,
            },
        });
    });

    it("ItemFiles Instance", () => {
        expect(wrapper.isVueInstance).toBeTruthy();
    });

    // it('Should return the Content Files', async () => {
    //    await wrapper.vm.getPrimaryFiles(1);
    //    console.log(wrapper.vm.primaryFiles._embedded.primaryfiles);
    // });
});
