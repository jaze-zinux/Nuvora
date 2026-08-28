/* =====================================================
   NUVORA V4
   Digital Safety Web App
===================================================== */


/* =====================================================
   SUPABASE
===================================================== */

const SUPABASE_URL =
    "https://zdtzxoreqoldwowtcozo.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
    "sb_publishable_-oEO9OAymU04dhYweV1SUQ_PyszP-Jm";


let supabaseClient = null;


/* Safely initialize Supabase */

function initializeSupabase() {

    if (
        !window.supabase ||
        typeof window.supabase.createClient !== "function"
    ) {

        console.warn(
            "Supabase library was not loaded."
        );

        return false;
    }


    if (
        SUPABASE_URL.includes("YOUR_") ||
        SUPABASE_PUBLISHABLE_KEY.includes("YOUR_")
    ) {

        console.warn(
            "Supabase credentials have not been configured."
        );

        return false;
    }


    try {

        supabaseClient =
            window.supabase.createClient(
                SUPABASE_URL,
                SUPABASE_PUBLISHABLE_KEY
            );

        return true;

    } catch (error) {

        console.error(
            "Supabase initialization failed:",
            error
        );

        return false;
    }
}


const supabaseReady =
    initializeSupabase();


/* =====================================================
   DOM
===================================================== */

const menuBtn =
    document.getElementById("menuBtn");

const mobileMenu =
    document.getElementById("mobileMenu");

const authBtn =
    document.getElementById("authBtn");

const mobileAuthBtn =
    document.getElementById("mobileAuthBtn");

const startBtn =
    document.getElementById("startBtn");

const authModal =
    document.getElementById("authModal");

const closeAuth =
    document.getElementById("closeAuth");

const authForm =
    document.getElementById("authForm");

const authTitle =
    document.getElementById("authTitle");

const authSubtitle =
    document.getElementById("authSubtitle");

const email =
    document.getElementById("email");

const password =
    document.getElementById("password");

const submitAuth =
    document.getElementById("submitAuth");

const switchAuth =
    document.getElementById("switchAuth");

const authMessage =
    document.getElementById("authMessage");

const accountStatus =
    document.getElementById("accountStatus");

const historySection =
    document.getElementById("historySection");

const history =
    document.getElementById("history");

const messageInput =
    document.getElementById("messageInput");

const counter =
    document.getElementById("counter");

const clearBtn =
    document.getElementById("clearBtn");

const analyzeMessageBtn =
    document.getElementById("analyzeMessage");

const linkInput =
    document.getElementById("linkInput");

const analyzeLinkBtn =
    document.getElementById("analyzeLink");

const result =
    document.getElementById("result");

const fileInput =
    document.getElementById("fileInput");

const dropZone =
    document.getElementById("dropZone");

const uploadStatus =
    document.getElementById("uploadStatus");

const toast =
    document.getElementById("toast");


/* =====================================================
   STATE
===================================================== */

let currentUser = null;

let signupMode = false;

let toastTimer = null;


/* =====================================================
   GENERAL HELPERS
===================================================== */

function escapeHTML(value) {

    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


function showToast(message) {

    if (!toast) {
        return;
    }


    toast.textContent =
        message;

    toast.classList.remove(
        "hidden"
    );


    clearTimeout(
        toastTimer
    );


    toastTimer =
        setTimeout(() => {

            toast.classList.add(
                "hidden"
            );

        }, 3000);
}


/* =====================================================
   MOBILE MENU
===================================================== */

function closeMobileMenu() {

    mobileMenu.classList.add(
        "hidden"
    );

    menuBtn.setAttribute(
        "aria-expanded",
        "false"
    );
}


function toggleMobileMenu() {

    const isHidden =
        mobileMenu.classList.contains(
            "hidden"
        );


    if (isHidden) {

        mobileMenu.classList.remove(
            "hidden"
        );

        menuBtn.setAttribute(
            "aria-expanded",
            "true"
        );

    } else {

        closeMobileMenu();

    }
}


menuBtn.addEventListener(
    "click",
    toggleMobileMenu
);


document
    .querySelectorAll(
        ".mobile-menu a"
    )
    .forEach(link => {

        link.addEventListener(
            "click",
            closeMobileMenu
        );

    });


/* =====================================================
   START CHECKING
===================================================== */

startBtn.addEventListener(
    "click",
    () => {

        const scanner =
            document.getElementById(
                "scanner"
            );


        scanner.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });


        setTimeout(() => {

            messageInput.focus();

        }, 600);

    }
);


/* =====================================================
   AUTH MODAL
===================================================== */

function openAuth() {

    authModal.classList.remove(
        "hidden"
    );

    document.body.classList.add(
        "modal-open"
    );

    setTimeout(() => {

        email.focus();

    }, 100);
}


function closeAuthModal() {

    authModal.classList.add(
        "hidden"
    );

    document.body.classList.remove(
        "modal-open"
    );

    authMessage.textContent = "";
}


authBtn.addEventListener(
    "click",
    async () => {

        if (currentUser) {

            await logout();

        } else {

            openAuth();

        }

    }
);


mobileAuthBtn.addEventListener(
    "click",
    async () => {

        closeMobileMenu();

        if (currentUser) {

            await logout();

        } else {

            openAuth();

        }

    }
);


closeAuth.addEventListener(
    "click",
    closeAuthModal
);


authModal.addEventListener(
    "click",
    event => {

        if (
            event.target === authModal
        ) {

            closeAuthModal();

        }

    }
);


document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            !authModal.classList.contains("hidden")
        ) {

            closeAuthModal();

        }

    }
);


/* =====================================================
   AUTH MESSAGE
===================================================== */

function showAuthMessage(
    message,
    isError = false
) {

    authMessage.textContent =
        message;

    authMessage.style.color =
        isError
            ? "#c13f49"
            : "";
}


/* =====================================================
   LOGIN / SIGNUP SWITCH
===================================================== */

switchAuth.addEventListener(
    "click",
    () => {

        signupMode =
            !signupMode;


        authMessage.textContent =
            "";


        if (signupMode) {

            authTitle.textContent =
                "Create your account";

            authSubtitle.textContent =
                "Save your Nuvora safety checks.";

            submitAuth.textContent =
                "Create account";

            switchAuth.textContent =
                "Already have an account? Sign in";

        } else {

            authTitle.textContent =
                "Welcome back";

            authSubtitle.textContent =
                "Sign in to save your safety checks.";

            submitAuth.textContent =
                "Sign in";

            switchAuth.textContent =
                "Create an account";
        }

    }
);


/* =====================================================
   AUTH FORM
===================================================== */

authForm.addEventListener(
    "submit",
    async event => {

        event.preventDefault();


        const userEmail =
            email.value.trim();

        const userPassword =
            password.value;


        if (!userEmail) {

            showAuthMessage(
                "Please enter your email.",
                true
            );

            return;
        }


        if (!userPassword) {

            showAuthMessage(
                "Please enter your password.",
                true
            );

            return;
        }


        if (
            userPassword.length < 6
        ) {

            showAuthMessage(
                "Password must contain at least 6 characters.",
                true
            );

            return;
        }


        if (!supabaseReady) {

            showAuthMessage(
                "Supabase is not configured yet.",
                true
            );

            return;
        }


        submitAuth.disabled =
            true;

        submitAuth.textContent =
            "Please wait...";


        try {

            if (signupMode) {

                await signUp(
                    userEmail,
                    userPassword
                );

            } else {

                await signIn(
                    userEmail,
                    userPassword
                );

            }

        } catch (error) {

            console.error(
                error
            );

            showAuthMessage(
                getFriendlyAuthError(
                    error
                ),
                true
            );

        } finally {

            submitAuth.disabled =
                false;

            submitAuth.textContent =
                signupMode
                    ? "Create account"
                    : "Sign in";
        }

    }
);


/* =====================================================
   FRIENDLY AUTH ERRORS
===================================================== */

function getFriendlyAuthError(
    error
) {

    const message =
        String(
            error?.message || ""
        ).toLowerCase();


    if (
        message.includes(
            "invalid login credentials"
        )
    ) {

        return "Incorrect email or password.";

    }


    if (
        message.includes(
            "user already registered"
        )
    ) {

        return "This email already has an account.";

    }


    if (
        message.includes(
            "email not confirmed"
        )
    ) {

        return "Please confirm your email before signing in.";

    }


    if (
        message.includes(
            "password should be at least"
        )
    ) {

        return "Your password is too short.";

    }


    return (
        error?.message ||
        "Something went wrong. Please try again."
    );
}


/* =====================================================
   SIGN UP
===================================================== */

async function signUp(
    userEmail,
    userPassword
) {

    const {
        data,
        error
    } =
        await supabaseClient.auth.signUp({

            email:
                userEmail,

            password:
                userPassword
        });


    if (error) {
        throw error;
    }


    if (!data.session) {

        showAuthMessage(
            "Account created. Check your email to confirm your account."
        );

        return;
    }


    currentUser =
        data.user;

    closeAuthModal();

    await updateUI();

    showToast(
        "Account created successfully."
    );
}


/* =====================================================
   SIGN IN
===================================================== */

async function signIn(
    userEmail,
    userPassword
) {

    const {
        data,
        error
    } =
        await supabaseClient.auth
            .signInWithPassword({

                email:
                    userEmail,

                password:
                    userPassword

            });


    if (error) {
        throw error;
    }


    currentUser =
        data.user;


    closeAuthModal();

    await updateUI();

    showToast(
        "Welcome back to Nuvora."
    );
}


/* =====================================================
   LOGOUT
===================================================== */

async function logout() {

    if (!supabaseReady) {
        return;
    }


    const {
        error
    } =
        await supabaseClient.auth.signOut();


    if (error) {

        console.error(
            error
        );

        showToast(
            "Could not sign out."
        );

        return;
    }


    currentUser =
        null;


    await updateUI();

    showToast(
        "You have been signed out."
    );
}


/* =====================================================
   AUTH STATE
===================================================== */

if (supabaseReady) {

    supabaseClient.auth.onAuthStateChange(
        (_event, session) => {

            currentUser =
                session?.user || null;

            updateUI();

        }
    );
}


/* =====================================================
   START APP
===================================================== */

async function startApp() {

    if (!supabaseReady) {

        await updateUI();

        return;
    }


    const {
        data,
        error
    } =
        await supabaseClient.auth
            .getSession();


    if (error) {

        console.error(
            error
        );

        await updateUI();

        return;
    }


    currentUser =
        data.session?.user || null;


    await updateUI();
}


startApp();


/* =====================================================
   UPDATE UI
===================================================== */

async function updateUI() {

    if (currentUser) {

        authBtn.textContent =
            "Sign out";

        mobileAuthBtn.textContent =
            "Sign out";

        accountStatus.textContent =
            currentUser.email ||
            "Signed in";

        historySection.classList.remove(
            "hidden"
        );

        await loadHistory();

    } else {

        authBtn.textContent =
            "Sign in";

        mobileAuthBtn.textContent =
            "Sign in";

        accountStatus.textContent =
            "Guest mode";

        historySection.classList.add(
            "hidden"
        );

    }
}


/* =====================================================
   MESSAGE COUNTER
===================================================== */

messageInput.addEventListener(
    "input",
    () => {

        const count =
            messageInput.value.length;


        counter.textContent =
            `${count} / 10000`;

    }
);


/* =====================================================
   CLEAR
===================================================== */

clearBtn.addEventListener(
    "click",
    () => {

        messageInput.value = "";

        counter.textContent =
            "0 / 10000";

        result.classList.add(
            "hidden"
        );

        messageInput.focus();

    }
);


/* =====================================================
   SCANNER TABS
===================================================== */

document
    .querySelectorAll(
        ".scanner-tab"
    )
    .forEach(tab => {

        tab.addEventListener(
            "click",
            () => {

                const selected =
                    tab.dataset.tab;


                document
                    .querySelectorAll(
                        ".scanner-tab"
                    )
                    .forEach(item => {

                        item.classList.remove(
                            "active"
                        );

                    });


                tab.classList.add(
                    "active"
                );


                document
                    .getElementById(
                        "messageTab"
                    )
                    .classList.toggle(
                        "hidden",
                        selected !== "message"
                    );


                document
                    .getElementById(
                        "linkTab"
                    )
                    .classList.toggle(
                        "hidden",
                        selected !== "link"
                    );


                document
                    .getElementById(
                        "screenshotTab"
                    )
                    .classList.toggle(
                        "hidden",
                        selected !== "screenshot"
                    );


                result.classList.add(
                    "hidden"
                );

            }
        );

    });


/* =====================================================
   MESSAGE ANALYSIS
===================================================== */

function analyzeMessageLocally(
    text
) {

    const value =
        text.toLowerCase();


    let score = 0;

    const reasons = [];


    const urgencyWords = [
        "urgent",
        "immediately",
        "act now",
        "verify now",
        "last chance",
        "expires today",
        "within 24 hours",
        "account will be closed"
    ];


    if (
        urgencyWords.some(
            word =>
                value.includes(word)
        )
    ) {

        score += 22;

        reasons.push(
            "The message uses urgency or pressure."
        );
    }


    const sensitiveWords = [
        "password",
        "otp",
        "pin",
        "cvv",
        "bank details",
        "card number",
        "login details",
        "verification code"
    ];


    if (
        sensitiveWords.some(
            word =>
                value.includes(word)
        )
    ) {

        score += 32;

        reasons.push(
            "It asks for sensitive information."
        );
    }


    const moneyWords = [
        "send money",
        "transfer money",
        "payment",
        "pay now",
        "upi",
        "processing fee",
        "pay",
        "refund"
    ];


    if (
        moneyWords.some(
            word =>
                value.includes(word)
        )
    ) {

        score += 20;

        reasons.push(
            "It involves money or a payment request."
        );
    }


    const rewardWords = [
        "you won",
        "winner",
        "lottery",
        "prize",
        "reward",
        "free gift",
        "cashback"
    ];


    if (
        rewardWords.some(
            word =>
                value.includes(word)
        )
    ) {

        score += 20;

        reasons.push(
            "It mentions an unexpected reward or prize."
        );
    }


    if (
        value.includes("http://") ||
        value.includes("https://") ||
        value.includes("www.")
    ) {

        score += 12;

        reasons.push(
            "The message contains a link."
        );
    }


    const impersonationWords = [
        "customer care",
        "support team",
        "official",
        "bank",
        "government",
        "police",
        "account department"
    ];


    if (
        impersonationWords.some(
            word =>
                value.includes(word)
        )
    ) {

        score += 10;

        reasons.push(
            "It may be presenting itself as an authority or organization."
        );
    }


    score =
        Math.min(
            score,
            100
        );


    let level =
      "LOW";


    if (score >= 60) {

        level =
            "HIGH";

    } else if (score >= 30) {

        level =
            "MEDIUM";
    }


    if (!reasons.length) {

        reasons.push(
            "No major warning patterns were detected."
        );
    }


    return {
        score,
        level,
        reasons
    };
}


/*
=====================================================
   ANALYZE MESSAGE
===================================================== */

analyzeMessageBtn.addEventListener(
    "click",
    async () => {

        const text =
            messageInput.value.trim();


        if (!text) {

            showToast(
                "Paste a message first."
            );

            messageInput.focus();

            return;
        }


        analyzeMessageBtn.disabled =
            true;

        analyzeMessageBtn.innerHTML =
            "Analyzing...";


        try {

            /*
             * We intentionally use the local engine
             * first so the app works immediately.
             */

            const analysis =
                analyzeMessageLocally(
                    text
                );


            displayResult(
                analysis
            );


            if (currentUser) {

                await saveScan(
                    text,
                    analysis
                );

                await loadHistory();

            }

        } finally {

            analyzeMessageBtn.disabled =
                false;

            analyzeMessageBtn.innerHTML =
                'Analyze message <span>→</span>';

        }

    }
);


/*
=====================================================
   LINK ANALYSIS
===================================================== */

analyzeLinkBtn.addEventListener(
    "click",
    async () => {

        const text =
            linkInput.value.trim();


        if (!text) {

            showToast(
                "Enter a URL first."
            );

            linkInput.focus();

            return;
        }


        let url;


        try {

            url =
                new URL(text);

        } catch {

            showToast(
                "Please enter a valid URL."
            );

            return;
        }


        let score = 0;

        const reasons = [];


        if (
            url.protocol !== "https:"
        ) {

            score += 25;

            reasons.push(
                "The URL does not use HTTPS."
            );
        }


        if (
            url.hostname.length > 35
        ) {

            score += 15;

            reasons.push(
                "The domain name is unusually long."
            );
        }


        if (
            url.hostname.includes("-")
        ) {

            score += 10;

            reasons.push(
                "The domain contains hyphen-separated words."
            );
        }


        if (
            url.hostname.split(".").length > 3
        ) {

            score += 10;

            reasons.push(
                "The URL contains several subdomain levels."
            );
        }


        if (
            /@/.test(
                url.href
            )
        ) {

            score += 20;

            reasons.push(
                "The URL contains an @ symbol, which can be misleading."
            );
        }


        if (
            url.hostname.includes(
                "xn--"
            )
        ) {

            score += 20;

            reasons.push(
                "The domain uses an encoded internationalized format."
            );
        }


        score =
            Math.min(
                score,
                100
            );


        let level =
            "LOW";


        if (score >= 60) {

            level =
                "HIGH";

        } else if (score >= 30) {

            level =
                "MEDIUM";
        }


        if (!reasons.length) {

            reasons.push(
                "No major URL warning pattern was detected."
            );
        }


        const analysis = {
            score,
            level,
            reasons
        };


        displayResult(
            analysis
        );


        if (currentUser) {

            await saveScan(
                text,
                analysis
            );

            await loadHistory();

        }

    }
);


/*
=====================================================
   DISPLAY RESULT
===================================================== */

function displayResult(
    analysis
) {

    const level =
        String(
            analysis.level || "UNKNOWN"
        ).toUpperCase();


    const score =
        Number(
            analysis.score || 0
        );


    const reasons =
        Array.isArray(
            analysis.reasons
        )
            ? analysis.reasons
            : [];


    const reasonHTML =
        reasons
            .map(
                reason =>
                    `<li>${escapeHTML(reason)}</li>`
            )
            .join("");


    result.innerHTML = `

        <div class="result-header">

            <strong>
                Risk assessment
            </strong>

            <span class="risk risk-${level.toLowerCase()}">

                ${escapeHTML(level)}
                ·
                ${score}/100

            </span>

        </div>


        <ul>
            ${reasonHTML}
        </ul>


        <p class="result-note">

            This is an automated warning assessment,
            not a guarantee that content is safe or unsafe.

            Never share passwords, OTPs, PINs or banking
            information simply because a message asks for them.

        </p>

    `;


    result.classList.remove(
        "hidden"
    );


    result.scrollIntoView({
        behavior: "smooth",
        block: "nearest"
    });
}


/*
=====================================================
   SCREENSHOT UPLOAD
===================================================== */

function handleImageFile(
    file
) {

    if (!file) {
        return;
    }


    const allowedTypes = [
        "image/png",
        "image/jpeg",
        "image/webp"
    ];


    if (
        !allowedTypes.includes(
            file.type
        )
    ) {

        uploadStatus.textContent =
            "Please choose a PNG, JPG or WEBP image.";

        return;
    }


    const maxSize =
        5 * 1024 * 1024;


    if (
        file.size > maxSize
    ) {

        uploadStatus.textContent =
            "The image must be smaller than 5 MB.";

        return;
    }


    uploadStatus.textContent =
        `✓ ${file.name} selected — ${(file.size / 1024 / 1024).toFixed(2)} MB`;


    showToast(
        "Screenshot selected."
    );


    /*
     * Browser-only preview.
     *
     * OCR/image intelligence can be added later
     * through a secure backend service.
     */

    const oldPreview =
        dropZone.querySelector(
            ".image-preview"
        );


    if (oldPreview) {
        oldPreview.remove();
    }


    const preview =
        document.createElement(
            "img"
        );


    preview.className =
        "image-preview";


    preview.style.maxWidth =
        "180px";

    preview.style.maxHeight =
        "180px";

    preview.style.margin =
        "20px auto 0";

    preview.style.display =
        "block";

    preview.style.borderRadius =
        "15px";


    preview.src =
        URL.createObjectURL(
            file
        );


    dropZone.appendChild(
        preview
    );
}


fileInput.addEventListener(
    "change",
    event => {

        const file =
            event.target.files?.[0];

        handleImageFile(
            file
        );

    }
);


/* Drag & drop */

dropZone.addEventListener(
    "dragover",
    event => {

        event.preventDefault();

        dropZone.classList.add(
            "dragging"
        );

    }
);


dropZone.addEventListener(
    "dragleave",
    () => {

        dropZone.classList.remove(
            "dragging"
        );

    }
);


dropZone.addEventListener(
    "drop",
    event => {

        event.preventDefault();

        dropZone.classList.remove(
            "dragging"
        );


        const file =
            event.dataTransfer.files?.[0];


        handleImageFile(
            file
        );

    }
);


/*
=====================================================
   SAVE SCAN
===================================================== */

async function saveScan(
    inputText,
    analysis
) {

    if (
        !currentUser ||
        !supabaseReady
    ) {

        return;
    }


    const {
        error
    } =
        await supabaseClient
            .from("scans")
            .insert({

                user_id:
                    currentUser.id,

                input_text:
                    inputText,

                risk_level:
                    analysis.level,

                risk_score:
                    analysis.score,

                reasons:
                    analysis.reasons

            });


    if (error) {

        console.error(
            "Could not save scan:",
            error
        );

    }
}


/*
=====================================================
   LOAD HISTORY
===================================================== */

async function loadHistory() {

    if (
        !currentUser ||
        !supabaseReady
    ) {

        return;
    }


    const {
        data,
        error
    } =
        await supabaseClient
            .from("scans")
            .select(
                "id,input_text,risk_level,risk_score,reasons,created_at"
            )
            .eq(
                "user_id",
                currentUser.id
            )
            .order(
                "created_at",
                {
                    ascending: false
                }
            );


    if (error) {

        console.error(
            "Could not load history:",
            error
        );

        history.innerHTML = `
            <div class="history-item">
                <p>
                    Could not load your scan history.
                </p>
            </div>
        `;

        return;
    }


    if (
        !data ||
        data.length === 0
    ) {

        history.innerHTML = `
            <div class="history-item">
                <p>
                    No scans yet. Analyze something to see your history.
                </p>
            </div>
        `;

        return;
    }


    history.innerHTML =
        data.map(
            scan => {

                const reasons =
                    Array.isArray(
                        scan.reasons
                    )
                        ? scan.reasons
                        : [];


                const level =
                    String(
                        scan.risk_level ||
                        "UNKNOWN"
                    ).toUpperCase();


                return `

                    <article class="history-item">

                        <div class="history-top">

                            <strong>
                                ${escapeHTML(level)}
                            </strong>

                            <span class="risk risk-${level.toLowerCase()}">

                                ${escapeHTML(level)}
                                ·
                                ${Number(
                                    scan.risk_score || 0
                                )}/100

                            </span>

                        </div>


                        <p>
                            ${escapeHTML(
                                scan.input_text || ""
                            )}
                        </p>


                        <small>
                            ${
                                scan.created_at
                                    ? new Date(
                                        scan.created_at
                                    ).toLocaleString()
                                    : ""
                            }
                        </small>


                        ${
                            reasons.length
                                ? `
                                    <ul>
                                        ${
                                            reasons
                                                .map(
                                                    reason =>
                                                        `<li>${escapeHTML(reason)}</li>`
                                                )
                                                .join("")
                                        }
                                    </ul>
                                `
                                : ""
                        }

                    </article>

                `;
            }
        ).join("");
}


/*
=====================================================
   CONNECTION STATUS
===================================================== */

if (!supabaseReady) {

    console.warn(
        "Nuvora is running in local mode. Configure Supabase credentials to enable accounts and history."
    );
}
// ========================================
// NOVARA PWA SERVICE WORKER
// ========================================

if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker
            .register("./sw.js")
            .then(() => {
                console.log("Novara service worker registered.");
            })
            .catch(error => {
                console.error(
                    "Service worker registration failed:",
                    error
                );
            });
    });
}